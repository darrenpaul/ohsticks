import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Product } from "$lib/types/product";
import { createCartItem, type Cart, type CartGuest, type CartItem } from "$lib/types/cart";
import { addToCartEvent, removeFromCartEvent } from "$lib/utils/googleTagManager";
import { cartGuestLocalStorageKey } from "$lib/constants/cart";
import {
	addToCartGuest,
	addToCartUser,
	removeFromCartGuest,
	removeFromCartUser
} from "$lib/utils/cartHelpers";

export const fetchGuestCart = async () => {
	if (!browser) return;

	const cartKey = localStorage.getItem(cartGuestLocalStorageKey);

	if (!cartKey) return [];

	const headers = new Headers();
	if (cartKey) {
		headers.append("cart-key", cartKey);
	}

	const response = await fetch("/api/cart-guest", {
		headers,
		method: "GET"
	});

	const cartData = await response.json();

	if (!cartData.cartKey) {
		// localStorage.removeItem(cartGuestLocalStorageKey);
	}

	cart.set(cartData);
};

export const fetchUserCart = async () => {
	if (!browser) return;

	localStorage.removeItem(cartGuestLocalStorageKey);

	const cartResponse = await fetch("/api/cart", {
		method: "GET"
	});

	const cartData = await cartResponse.json();

	cart.set(cartData);
};

export const cart = writable({} as Cart | CartGuest | null);

export const clearCart = () => {
	cart.set(null);
};

export const addToCart = async (product: Product, session) => {
	addToCartEvent(product);

	const cartItem: CartItem = createCartItem(product);

	if (session) {
		const cartData = await addToCartUser(cartItem);

		if (cartData) {
			cart.set(cartData);
		}
	} else {
		const cartData = await addToCartGuest(cartItem);
		if (cartData) {
			cart.set(cartData);
		}
	}
};

export const removeFromCart = async (product: Product, session, index = 0) => {
	const cartItem: CartItem = createCartItem(product);

	removeFromCartEvent(cartItem, index);

	if (session) {
		const cartData = await removeFromCartUser(cartItem);
		if (cartData) {
			cart.set(cartData);
		}
	} else {
		const cartData = await removeFromCartGuest(cartItem);
		if (cartData) {
			cart.set(cartData);
		}
	}
};
