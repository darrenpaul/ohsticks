import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { addDays, isAfter } from "date-fns";
import type { CartItem, CartUser } from "$lib/types/cart";
import { error } from "@sveltejs/kit";
import { mergeCartItems } from "$lib/utils/cartHelpers.js";
import type { QuerySnapshot } from "firebase-admin/firestore";
import type { Product } from "$lib/types/product.js";

const table = "cart";

const getLatestCart = async (tableSnapshot: QuerySnapshot) => {
	// Multiple carts found, delete old carts and use the latest one
	const userCarts: CartUser[] = tableSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	})) as CartUser[];

	userCarts.sort((a: CartUser, b: CartUser) => b.createdAt.seconds - a.createdAt.seconds);

	const cartData = userCarts.shift() as CartUser;

	if (userCarts.length > 0) {
		// Delete old carts
		userCarts.forEach(async (cart) => {
			await adminDB.collection(table).doc(cart.id).delete();
		});
	}

	// Ensures the cart data always contains the latest product data
	const productTableSnapshot = await adminDB.collection("product").get();
	const products = productTableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	const syncedWithProducts = cartData.cartItems.map((cartItem) => {
		const product: Product = products.find((product) => product.id === cartItem.id) as Product;

		if (!product) return undefined;

		return {
			...cartItem,
			image: {
				...product.featureImage
			},
			price: product.price,
			name: product.name,
			description: product.description,
			brand: product.brand,
			id: product.id,
			categories: product.categories
		};
	});
	const removedUndefined = syncedWithProducts.filter((item) => item !== undefined);

	return { ...cartData, cartItems: removedUndefined };
};

// ADD ITEM TO CART
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

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

	const { cartItem } = await request.json();

	const tableSnapshot = await adminDB
		.collection(table)
		.where("userId", "==", decodedIdToken.uid)
		.get();

	if (!tableSnapshot.empty) {
		const cartData = await getLatestCart(tableSnapshot);

		if (cartData) {
			const cartItems = cartData.cartItems as CartItem[];

			cartItems.push(cartItem);

			const mergedCartItems: CartItem[] = mergeCartItems(cartItems);

			const payload = {
				userId: decodedIdToken.uid,
				cartItems: mergedCartItems,
				expiration: addDays(new Date(), 7),
				createdAt: new Date()
			};
			await adminDB.collection(table).doc(cartData.id).set(payload);

			return new Response(JSON.stringify(payload), {
				headers: {
					"Content-Type": "application/json"
				}
			});
		}
	}

	// No carts found, create new cart
	const payload = {
		userId: decodedIdToken.uid,
		cartItems: [cartItem],
		expiration: addDays(new Date(), 7),
		createdAt: new Date()
	};

	await adminDB.collection(table).doc().set(payload);

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// GET CART
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

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

	const cartData = await getLatestCart(tableSnapshot);

	if (!cartData) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const { expiration, cartItems } = cartData;

	// Delete Cart if expired
	const expirationDate = new Date(expiration.seconds * 1000);
	if (isAfter(new Date(), new Date(expirationDate))) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	return new Response(JSON.stringify({ cartItems, userId: decodedIdToken.uid }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// DELETE ITEM FROM CART
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

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

	const { cartItem } = await request.json();

	const tableSnapshot = await adminDB
		.collection(table)
		.where("userId", "==", decodedIdToken.uid)
		.get();

	if (tableSnapshot.empty) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const cartData = await getLatestCart(tableSnapshot);

	if (cartData) {
		const cartItems = cartData.cartItems as CartItem[];

		const filteredCartItems = cartItems.filter((item) => item.id !== cartItem.id);

		const mergedCartItems: CartItem[] = mergeCartItems(filteredCartItems);

		const payload = {
			userId: decodedIdToken.uid,
			cartItems: mergedCartItems,
			expiration: addDays(new Date(), 7),
			createdAt: new Date()
		};
		await adminDB.collection(table).doc(cartData.id).set(payload);

		return new Response(JSON.stringify(payload), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};
