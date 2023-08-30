import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Product } from "$lib/types/product";
import type { Cart, CartItem } from "$lib/types/cart";

const storageKey = "cartKey";

const handleStoreFetch = async () => {
	if (!browser) return;
	const cartKey = localStorage.getItem(storageKey);

	if (!cartKey) return [];

	const response = await fetch(`/api/cart?cartKey=${cartKey}`, {
		method: "GET"
	});

	const jsonData = await response.json();

	if (!jsonData.id) {
		localStorage.removeItem(storageKey);
	}

	cart.set(jsonData);
};

export const cart = writable({} as Cart);
handleStoreFetch();

export const addToCart = async (product: Product) => {
	const cartKey = localStorage.getItem(storageKey);

	console.log(get(cart));

	const currentCartItems = get(cart).cartItems || [];

	const cartItems = [
		{
			id: product.id,
			name: product.name,
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
