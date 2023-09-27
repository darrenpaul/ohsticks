import type { Cart, CartGuest } from "$lib/types/cart";
import type { ShippingMethod } from "$lib/types/order";

export interface CheckoutPayload {
	email: string;
	country: string;
	firstName: string;
	lastName: string;
	address1: string;
	address2: string;
	city: string;
	province: string;
	postalCode: string;
	paymentMethod: string;
	shippingMethod: ShippingMethod;
	cart: Cart | CartGuest;
}
