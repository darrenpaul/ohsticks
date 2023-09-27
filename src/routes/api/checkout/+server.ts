import type { NewOrder } from "$lib/types/order";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ fetch, request }) => {
	const {
		email,
		country,
		firstName,
		lastName,
		address1,
		address2,
		city,
		province,
		postalCode,
		paymentMethod,
		shippingMethod,
		cart
	} = await request.json();

	const orderPayload: NewOrder = {
		customer: {
			firstName,
			lastName,
			email
		},
		shippingAddress: {
			address1,
			address2,
			city,
			province,
			postalCode,
			country
		},
		paymentMethod,
		shippingMethod,
		items: cart.cartItems
	};

	const orderResponse = await fetch("/api/order", {
		method: "POST",
		body: JSON.stringify(orderPayload)
	});

	const order = await orderResponse.json();

	const stripeResponse = await fetch("/api/stripe/create-payment", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ order })
	});

	const { sessionUrl } = await stripeResponse.json();

	return new Response(JSON.stringify({ order, sessionUrl }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
