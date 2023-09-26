import type { Order } from "$lib/types/order";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const response = await fetch("/api/order", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const orderId = params.id;
	const orders = await response.json();
	const order = orders.find((order: Order) => {
		return order.id === orderId;
	});

	return {
		order: order
	};
}
