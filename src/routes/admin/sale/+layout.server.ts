/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch("/api/admin/product", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const products = await response.json();

	return {
		products: products
	};
}
