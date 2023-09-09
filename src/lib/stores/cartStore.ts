import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Product } from "$lib/types/product";
import type { Cart, CartGuest, CartItem } from "$lib/types/cart";
import { addToCartEvent } from "$lib/utils/googleTagManager";
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
		localStorage.removeItem(cartGuestLocalStorageKey);
	}

	cart.set(cartData);
};

export const fetchUserCart = async (accessToken: string) => {
	if (!browser) return;

	localStorage.removeItem(cartGuestLocalStorageKey);

	const headers = new Headers();
	headers.append("x-access-token", accessToken);

	const cartResponse = await fetch("/api/cart", {
		headers,
		method: "GET"
	});

	const cartData = await cartResponse.json();

	cart.set(cartData);
};

export const cart = writable({} as Cart | CartGuest | null);

export const clearCart = () => {
	cart.set(null);
};

export const addToCart = async (product: Product, accessToken: string | null | undefined) => {
	addToCartEvent(product);

	const cartItem: CartItem = {
		id: product.id,
		name: product.name,
		description: product.description,
		quantity: 1,
		price: product.price.toString(),
		image: product.featureImage,
		categories: product.categories
	};

	if (accessToken) {
		const cartData = await addToCartUser(cartItem, accessToken);
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

export const removeFromCart = async (product: Product, accessToken: string | null | undefined) => {
	// TODO: Change to remove from cart event
	// addToCartEvent(product);

	const cartItem: CartItem = {
		id: product.id,
		name: product.name,
		description: product.description,
		quantity: 1,
		price: product.price.toString(),
		image: product.featureImage,
		categories: product.categories
	};

	if (accessToken) {
		const cartData = await removeFromCartUser(cartItem, accessToken);
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
