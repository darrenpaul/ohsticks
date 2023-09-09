import type { Image } from "$lib/types/product";
export type CartItem = {
	id: string;
	name: string;
	description: string;
	price: string;
	quantity: number;
	image: Image;
	categories: string[];
};

export type CartGuest = {
	id: string;
	cartItems: CartItem[];
};

export type Cart = {
	id: string;
	userId: string;
	cartItems: CartItem[];
};

export type CartResponse = {
	id: string;
	userId: string;
	cartItems: CartItem[];
	expiration: { seconds: number };
};

export type CartUser = {
	id: string;
	userId: string;
	cartItems: CartItem[];
	expiration: { seconds: number };
	createdAt: { seconds: number };
};
