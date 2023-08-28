// CREATE
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
		cart
	} = await request.json();

	const payload = {
		email,
		country,
		firstName,
		lastName,
		address1,
		address2,
		city,
		province,
		postalCode,
		items: cart.cartItems
	};

	const order = await eventFetch("/api/order", {
		method: "POST",
		body: JSON.stringify(payload)
	});

	return new Response(JSON.stringify(order), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
