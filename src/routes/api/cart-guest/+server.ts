import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { addDays, isAfter } from "date-fns";
import type { CartItem, CartResponse } from "$lib/types/cart";
import { error } from "@sveltejs/kit";

const table = "cart";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
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

	cartReference.set({
		cartItems: newCartItems,
		expiration
	});

	// const cartData = (await adminDB.collection(table).doc(cartReference.id).get()).data();

	const jsonString = JSON.stringify({ id: cartReference.id, cartItems: newCartItems });

	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, url }) => {
	const accessToken = request.headers.get("x-access-token");
	const cartKey = url.searchParams.get("cartKey");

	if (!cartKey) {
		return new Response(
			String({
				status: 200
			})
		);
	}

	const cartData = await adminDB.collection(table).doc(cartKey).get();

	if (!cartData.exists) {
		const jsonString = JSON.stringify({});

		return new Response(jsonString, {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const { cartItems, userId, expiration } = cartData.data() as CartResponse;

	if (userId && !accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	if (userId && accessToken) {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
		if (decodedIdToken.uid !== userId) {
			throw error(401, {
				message: "unauthorized"
			});
		}
	}

	const expirationDate = new Date(expiration.seconds * 1000);
	if (isAfter(new Date(), new Date(expirationDate))) {
		await adminDB.collection(table).doc(cartKey).delete();
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
