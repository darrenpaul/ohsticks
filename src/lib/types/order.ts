import type { Image, Product } from "./product";

export type NewOrder = {
	customer: Customer;
	shippingAddress: IngAddress;
	billingAddress: IngAddress;
	items: Product[];
	paymentMethod: string;
	shippingMethod: ShippingMethod;
	shippingCost: number;
	tax: number;
	subtotal: number;
	total: number;
	status: string;
	createdAt: string;
	updatedAt: string;
};

export type Order = {
	id: string;
	customer: Customer;
	shippingAddress: IngAddress;
	billingAddress: IngAddress;
	items: Product[];
	paymentMethod: string;
	shippingMethod: ShippingMethod;
	shippingCost: number;
	tax: number;
	subtotal: number;
	total: number;
	status: string;
	createdAt: string;
	updatedAt: string;
};

export type OrderItem = {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	image: Image;
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
	phone: string;
};

export type ShippingMethod = {
	id: string;
	label: string;
	description: string;
	price: number;
};
