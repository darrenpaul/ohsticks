import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { addDays, isAfter } from "date-fns";
import type { CartItem, CartResponse } from "$lib/types/cart";
import { error } from "@sveltejs/kit";
import { mergeCartItems } from "$lib/utils/cartHelpers.js";
import { cart } from "$lib/stores/cartStore.js";

const table = "cart";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

	const { cartKey, cartItems } = await request.json();

	const mergedCartItems: {
		[prop: string]: CartItem;
	} = {};

	cartItems.forEach((item) => {
		if (mergedCartItems[item.id]) {
			mergedCartItems[item.id].quantity = item.quantity + mergedCartItems[item.id].quantity;
		} else {
			mergedCartItems[item.id] = item;
		}
	});

	const newCartItems = Object.values(mergedCartItems);

	const expiration = addDays(new Date(), 7);

	const cartReference =
		cartKey === null
			? await adminDB.collection(table).doc()
			: await adminDB.collection(table).doc(cartKey);

	const payload = {
		cartItems: newCartItems,
		expiration
	};

	if (accessToken) {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
		if (!decodedIdToken) {
			throw error(401, {
				message: "unauthorized"
			});
		}

		payload["userId"] = decodedIdToken.uid;
	}

	cartReference.set(payload);

	const jsonString = JSON.stringify({ id: cartReference.id, ...payload });

	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, url, fetch }) => {
	const accessToken = request.headers.get("x-access-token");
	const cartKey = url.searchParams.get("cartKey");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	if (!decodedIdToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const tableSnapshot = await adminDB
		.collection(table)
		.where("userId", "==", decodedIdToken.uid)
		.get();

	const carts: CartResponse[] = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	if (carts.length === 0) {
		const jsonString = JSON.stringify({});
		return new Response(jsonString, {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const cartData: CartResponse = carts[0];
	const { expiration, cartItems } = cartData;

	// Fetch cart from cartKey
	if (cartKey) {
		const guestCartReference = await adminDB.collection(table).doc(cartKey).get();
		const guestCartData = guestCartReference.data() as CartResponse;

		if (guestCartData) {
			const { cartItems: guestCartItems } = guestCartData;
			const mergedCartItems: CartItem[] = mergeCartItems([...cartItems, ...guestCartItems]);
			cartItems.concat(mergedCartItems);

			const cartReference = await adminDB.collection(table).doc(cartData.id);
			cartReference.set({
				id: cartReference.id,
				cartItems,
				expiration,
				userId: decodedIdToken.uid
			});
		}
	}

	const expirationDate = new Date(expiration.seconds * 1000);
	if (isAfter(new Date(), new Date(expirationDate))) {
		const jsonString = JSON.stringify({});

		return new Response(jsonString, {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const jsonString = JSON.stringify({ id: cartKey, cartItems });

	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request }) => {
	const { id, status } = await request.json();

	await adminDB.collection(table).doc(id).update({
		status
	});

	return new Response(
		String({
			status: 200
		})
	);
};

// DELETE
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
	const { id } = await request.json();

	await adminDB.collection(table).doc(id).delete();

	return new Response(
		String({
			status: 200
		})
	);
};
