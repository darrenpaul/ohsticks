import type { Product } from "$lib/types/product";

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const slug = params.slug;

	const queries = [{ key: "currency", value: "zar" }];
	const queryString = queries.map((query) => `${query.key}=${query.value}`).join("&");

	const url = `/api/product?${queryString}`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const products = await response.json();

	const product = products.find((product: Product) => product.slug === slug);

	if (!product) {
		return {
			status: 404,
			body: {
				message: "Product not found"
			}
		};
	}

	return {
		status: 200,
		body: { product: product, relatedProducts: products }
	};
}
