import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Product } from "$lib/types/product";
import type { Cart, CartGuest, CartItem } from "$lib/types/cart";

const storageKey = "cartKey";

export const fetchGuestCart = async () => {
	if (!browser) return;

	const cartKey = localStorage.getItem(storageKey);

	if (!cartKey) return [];

	const response = await fetch(`/api/cart-guest?cartKey=${cartKey}`, {
		method: "GET"
	});

	const jsonData = await response.json();

	if (!jsonData.id) {
		localStorage.removeItem(storageKey);
	}

	cart.set(jsonData);
};

export const fetchUserCart = async (accessToken: string) => {
	if (!browser) return;

	const cartKey = localStorage.getItem(storageKey);

	const headers = new Headers();
	headers.append("x-access-token", accessToken);

	const cartResponse = await fetch(`/api/cart?cartKey=${cartKey}`, {
		headers,
		method: "GET"
	});

	const cartData = await cartResponse.json();

	// localStorage.removeItem(storageKey);

	cart.set(cartData);
};

export const cart = writable({} as Cart | CartGuest);

export const addToCart = async (product: Product, accessToken: string | null) => {
	const cartKey = localStorage.getItem(storageKey);

	const currentCartItems = get(cart).cartItems || [];

	const cartItems = [
		{
			id: product.id,
			name: product.name,
			description: product.description,
			quantity: 1,
			price: product.price,
			image: product.featureImage
		},
		...currentCartItems
	];

	const payload = {
		cartKey,
		cartItems
	};

	const headers = new Headers();

	if (accessToken) {
		headers.append("x-access-token", accessToken);
	}

	const response = await fetch("/api/cart", {
		method: "POST",
		headers,
		body: JSON.stringify(payload)
	});

	const jsonData = await response.json();

	if (jsonData.id) {
		localStorage.setItem(storageKey, jsonData.id);
		cart.set(jsonData);
	}
};

export const removeFromCart = async (cartItem: CartItem) => {
	const cartKey = localStorage.getItem(storageKey);

	const currentCartItems = get(cart).cartItems || [];

	const cartItems = currentCartItems.filter((item: CartItem) => item.id !== cartItem.id);

	const payload = {
		cartKey,
		cartItems
	};

	const response = await fetch("/api/cart", {
		method: "POST",
		body: JSON.stringify(payload)
	});

	const jsonData = await response.json();

	if (jsonData.id) {
		localStorage.setItem(storageKey, jsonData.id);
		cart.set(jsonData);
	}
};
