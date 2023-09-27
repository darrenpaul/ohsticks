import type { CartItem } from "./cart";
import type { Image, Product } from "./product";

export interface NewOrder {
	customer: Customer;
	shippingAddress: IngAddress;
	items: Product[];
	paymentMethod: string;
	shippingMethod: ShippingMethod;
}

export interface NewSbOrder {
	email: string;
	customer: Customer;
	shipping_address: IngAddress;
	payment_method: string;
	items: CartItem[];
	subtotal: string;
	shipping_method: ShippingMethod;
	currency: string;
	total: string;
}

export interface Order {
	id: string;
	customer: Customer;
	shippingAddress: IngAddress;
	items: OrderItem[];
	paymentMethod: string;
	shippingMethod: ShippingMethod;
	subtotal: number;
	total: number;
	status: string;
	created_at: Date;
	updated_at: Date;
}

export type OrderItem = {
	id: string;
	name: string;
	description: string;
	slug: string;
	brand: string;
	price: number;
	currency: string;
	discount: number;
	quantity: number;
	image: Image;
	categories: string[];
};

export type IngAddress = {
	address1: string;
	address2: string;
	city: string;
	province: string;
	postalCode: string;
	country: string;
};

export type Customer = {
	firstName: string;
	lastName: string;
	email: string;
};

export type ShippingMethod = {
	id: string;
	label: string;
	description: string;
	price: number;
};
