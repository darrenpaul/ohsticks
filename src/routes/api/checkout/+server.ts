// CREATE

import { created } from "$lib/constants/orderUpdate.js";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ fetch: eventFetch, request }) => {
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
		cart
	} = await request.json();

	const payload = {
		customer: {
			firstName,
			lastName,
			email
		},
		shippingAddress: {
			address1,
			address2,
			city,
			state: province,
			zip: postalCode,
			country
		},
		billingAddress: {
			address1,
			address2,
			city,
			state: province,
			zip: postalCode,
			country
		},
		status: created,
		paymentMethod,
		items: cart.cartItems
	};

	const orderResponse = await eventFetch("/api/order", {
		method: "POST",
		body: JSON.stringify(payload)
	});

	const order = await orderResponse.json();

	const stripeResponse = await eventFetch("/api/stripe/create-payment", {
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
