import type { Product } from "$lib/types/product";

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const slug = params.slug;

	const response = await fetch("/api/product", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const products = await response.json();

	const filteredProducts = products.filter(
		(product: Product) => slug === "all" || product.categories.includes(slug)
	);

	if (products.length === 0) {
		return {
			status: 404,
			body: {
				message: "Product not found"
			}
		};
	}

	return {
		status: 200,
		body: { products: filteredProducts }
	};
}
