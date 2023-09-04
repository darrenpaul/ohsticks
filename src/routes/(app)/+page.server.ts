/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch("/api/product", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const products = await response.json();

	return {
		status: 200,
		body: {
			products
		}
	};
}
