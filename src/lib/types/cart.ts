import type { Image } from "$lib/types/product";
export type CartItem = {
	id: string;
	name: string;
	price: string;
	quantity: number;
	image: Image;
};

export type Cart = {
	id: string;
	cartItems: CartItem[];
};

export type CartResponse = {
	id: string;
	cartItems: Cart[];
	expiration: { seconds: number };
};
