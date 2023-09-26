import { PRODIGI_API_KEY, PRODIGI_API_URL } from "$env/static/private";
import type { OrderItem } from "$lib/types/order";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const { country, currency, items } = await request.json();
	console.log("POST ~ items:", items);
	console.log("POST ~ currency:", currency);
	console.log("POST ~ country:", country);

	const payload = {
		shippingMethod: "express",
		destinationCountryCode: country,
		currencyCode: currency,
		items: items.map((item: OrderItem) => ({
			sku: "GLOBAL-STI-3X4-M",
			copies: item.quantity,
			attributes: {
				finish: "matt"
			},
			assets: [{ printArea: "default" }]
		}))
	};

	const response = await fetch(`${PRODIGI_API_URL}/v4.0/quotes`, {
		headers: {
			"X-API-Key": PRODIGI_API_KEY,
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify(payload)
	});

	const data = await response.json();
	console.log("POST ~ data:", data);

	return new Response(JSON.stringify(data), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
