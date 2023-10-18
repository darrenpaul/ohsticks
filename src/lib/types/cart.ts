import type { Attribute, Image, Product } from "$lib/types/product";

export type CartItem = {
	id: string;
	name: string;
	description: string;
	attributes: Attribute[];
	slug: string;
	brand: string;
	price: string;
	discount: number;
	currency: string;
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

export const createCartItem = (product: Product) => {
	return {
		id: product.id,
		name: product.name,
		description: product.description,
		attributes: product.attributes,
		brand: product.brand,
		slug: product.slug,
		quantity: 1,
		price: product.price.toString(),
		discount: product.discount,
		currency: product.currency,
		image: product.featureImage,
		categories: product.categories
	} as CartItem;
};
