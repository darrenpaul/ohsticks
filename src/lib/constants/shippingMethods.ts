import type { ShippingMethod } from "$lib/types/order";

export const standardShipping = {
	id: "shr_1NnKHpGQocPdnFnIiXyE680L",
	label: "Standard Shipping",
	description: "Delivered within 8 weeks",
	price: 3
};

export const expressShipping = {
	id: "shr_1NnKNfGQocPdnFnIdYvLPnDj",
	label: "Express Shipping",
	description: "Delivered within 5 working days",
	price: 10
};

export const shippingMethods: ShippingMethod[] = [standardShipping, expressShipping];
