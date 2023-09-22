import { cartActionRemove, cartGuestLocalStorageKey } from "$lib/constants/cart";
import type { CartItem } from "$lib/types/cart";

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

export const addToCartUser = async (cartItem: CartItem) => {
	const response = await fetch("/api/cart", {
		method: "POST",
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
		method: "POST",
		headers,
		body: JSON.stringify({ cartItem, action: cartActionRemove })
	});

	const cartData = await response.json();

	if (cartData.cartKey) {
		localStorage.setItem(cartGuestLocalStorageKey, cartData.cartKey);
		return cartData;
	}
};

export const removeFromCartUser = async (cartItem: CartItem) => {
	const response = await fetch("/api/cart", {
		method: "POST",

		body: JSON.stringify({ cartItem, action: cartActionRemove })
	});

	const cartData = await response.json();

	if (cartData) {
		return cartData;
	}
};
