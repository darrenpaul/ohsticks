/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const orderResponse = await fetch("/api/admin/order", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const orders = await orderResponse.json();

	return {
		orders: orders
	};
}
