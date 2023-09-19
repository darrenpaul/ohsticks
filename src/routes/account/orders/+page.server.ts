/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch("/api/order", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const orders = await response.json();

	return {
		orders: orders
	};
}
