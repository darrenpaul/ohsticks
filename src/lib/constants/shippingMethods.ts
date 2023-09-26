import type { ShippingMethod } from "$lib/types/order";

export const budgetShipping = {
	id: "shr_1Nudu5GQocPdnFnIGOdJAw90",
	label: "Budget Shipping",
	description: "Delivered within 3 weeks",
	value: "Budget",
	price: 3
};

export const standardShipping = {
	id: "shr_1NudtfGQocPdnFnICuLusqyi",
	label: "Standard Shipping",
	description: "Delivered within 1 week",
	value: "Standard",
	price: 7
};

export const expressShipping = {
	id: "shr_1NnKNfGQocPdnFnIdYvLPnDj",
	label: "Express Shipping",
	description: "Delivered within 5 working days",
	value: "Express",
	price: 15
};

export const shippingMethods: ShippingMethod[] = [
	budgetShipping,
	standardShipping,
	expressShipping
];
