import { cartGuestLocalStorageKey } from "$lib/constants/cart";
import type { CartItem } from "$lib/types/cart";

export const mergeCartItems = (cartItems: CartItem[]) => {
	const mergedCartItems: { [prop: string]: CartItem } = {};

	cartItems.forEach((item) => {
		if (mergedCartItems[item.id]) {
			mergedCartItems[item.id].quantity = item.quantity + mergedCartItems[item.id].quantity;
		} else {
			mergedCartItems[item.id] = item;
		}
	});

	return Object.values(mergedCartItems);
};

export const addToCartGuest = async (cartItem: CartItem) => {
	const cartKey = localStorage.getItem(cartGuestLocalStorageKey);

	const headers = new Headers();
	if (cartKey) {
		headers.append("cart-key", cartKey);
	}

	const response = await fetch("/api/cart-guest", {
		method: "POST",
		headers,
		body: JSON.stringify({ cartItem })
	});

	const cartData = await response.json();

	if (cartData.cartKey) {
		localStorage.setItem(cartGuestLocalStorageKey, cartData.cartKey);
		return cartData;
	}
};

export const addToCartUser = async (cartItem: CartItem, accessToken: string) => {
	const headers = new Headers();
	if (accessToken) {
		headers.append("x-access-token", accessToken);
	}

	const response = await fetch("/api/cart", {
		method: "POST",
		headers,
		body: JSON.stringify({ cartItem })
	});

	const cartData = await response.json();

	if (cartData) {
		return cartData;
	}
};

export const removeFromCartGuest = async (cartItem: CartItem) => {
	const cartKey = localStorage.getItem(cartGuestLocalStorageKey);

	const headers = new Headers();
	if (cartKey) {
		headers.append("cart-key", cartKey);
	}

	const response = await fetch("/api/cart-guest", {
		method: "DELETE",
		headers,
		body: JSON.stringify({ cartItem })
	});

	const cartData = await response.json();

	if (cartData.cartKey) {
		localStorage.setItem(cartGuestLocalStorageKey, cartData.cartKey);
		return cartData;
	}
};

export const removeFromCartUser = async (cartItem: CartItem, accessToken: string) => {
	const headers = new Headers();
	if (accessToken) {
		headers.append("x-access-token", accessToken);
	}

	const response = await fetch("/api/cart", {
		method: "DELETE",
		headers,
		body: JSON.stringify({ cartItem })
	});

	const cartData = await response.json();

	if (cartData) {
		return cartData;
	}
};
