import { adminDB } from "$lib/server/firebaseAdminClient";
import { addDays, isAfter } from "date-fns";
import type { CartItem, CartResponse } from "$lib/types/cart";
import { mergeCartItems } from "$lib/utils/cartHelpers.js";
import type { Product } from "$lib/types/product";

const table = "cart";

// ADD ITEM TO CART
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const cartKey = request.headers.get("cart-key");
	const { cartItem } = await request.json();

	if (cartKey) {
		const cartReference = await adminDB.collection(table).doc(cartKey);

		const cartData = (await cartReference.get()).data();

		if (cartData) {
			const cartItems = cartData.cartItems as CartItem[];
			cartItems.push(cartItem);

			const mergedCartItems = mergeCartItems(cartItems);

			const payload = {
				cartItems: mergedCartItems,
				expiration: addDays(new Date(), 7),
				createdAt: new Date()
			};

			cartReference.update(payload);

			return new Response(JSON.stringify({ cartKey: cartReference.id, ...payload }), {
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		// If cartData is null, then a new cart will be created
	}
	const cartReference = await adminDB.collection(table).doc();
	const payload = {
		cartItems: [cartItem],
		expiration: addDays(new Date(), 7),
		createdAt: new Date()
	};
	await cartReference.set(payload);
	return new Response(JSON.stringify({ cartKey: cartReference.id, ...payload }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// GET CART
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, url, fetch }) => {
	const cartKey = request.headers.get("cart-key");

	if (!cartKey) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const guestCartReference = await adminDB.collection(table).doc(cartKey).get();
	const guestCartData = guestCartReference.data() as CartResponse;

	if (!guestCartData) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const { cartItems, expiration } = guestCartData;

	const expirationDate = new Date(expiration.seconds * 1000);
	if (isAfter(new Date(), new Date(expirationDate))) {
		const jsonString = JSON.stringify({});

		return new Response(jsonString, {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	// Ensures the cart data always contains the latest product data
	const productTableSnapshot = await adminDB.collection("product").get();
	const products = productTableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	const syncedWithProducts = cartItems.map((cartItem) => {
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

	const jsonString = JSON.stringify({ cartKey: cartKey, cartItems: removedUndefined });

	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// DELETE ITEM FROM CART
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
	const cartKey = request.headers.get("cart-key");
	const { cartItem } = await request.json();

	if (!cartKey) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const cartReference = await adminDB.collection(table).doc(cartKey);
	const cartData = (await cartReference.get()).data();

	if (!cartData) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const cartItems = cartData.cartItems as CartItem[];
	const filteredCartItems = cartItems.filter((item) => item.id !== cartItem.id);

	const mergedCartItems = mergeCartItems(filteredCartItems);

	const payload = {
		cartItems: mergedCartItems,
		expiration: addDays(new Date(), 7),
		createdAt: new Date()
	};

	cartReference.update(payload);

	return new Response(JSON.stringify({ cartKey: cartReference.id, ...payload }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
