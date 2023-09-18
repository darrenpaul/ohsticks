import type { Order } from "$lib/types/order.js";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url, params }) {
	const orderId = params.id;

	const orderResponse = await fetch("/api/admin/order", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const orders = await orderResponse.json();

	const order = orders.find((order: Order) => order.id === orderId);
	if (!order) {
		return {
			status: 404,
			error: new Error("Not found")
		};
	}
	return {
		order: order
	};
}
