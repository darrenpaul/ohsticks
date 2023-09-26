import { PRODIGI_API_KEY, PRODIGI_API_URL } from "$env/static/private";
import type { Order, OrderItem } from "$lib/types/order";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const jsonData = await request.json();
	const order: Order = jsonData.order;

	const payload = {
		merchantReference: order.id,
		shippingMethod: "Overnight",
		recipient: {
			name: `${order.customer.firstName} ${order.customer.lastName}`,
			email: order.customer.email,
			address: {
				line1: order.shippingAddress.address1,
				line2: order.shippingAddress.address2 || undefined,
				postalOrZipCode: order.shippingAddress.postalCode,
				countryCode: order.shippingAddress.country,
				townOrCity: order.shippingAddress.city,
				stateOrCounty: order.shippingAddress.province
			}
		},
		items: order.items.map((item: OrderItem) => ({
			merchantReference: item.id,
			sku: "GLOBAL-STI-3X4-M",
			copies: item.quantity,
			sizing: "fillPrintArea",
			attributes: {
				finish: "matt"
			},
			recipientCost: {
				amount: item.price,
				currency: item.currency
			},
			assets: [
				{
					printArea: "default",
					url: item.image.src
				}
			]
		}))
	};

	const response = await fetch(`${PRODIGI_API_URL}/v4.0/Orders`, {
		headers: {
			"X-API-Key": PRODIGI_API_KEY
		},
		method: "POST",
		body: JSON.stringify(payload)
	});

	const { data } = await response.json();

	return new Response(JSON.stringify({ order: data.order }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
