import { adminDB } from "$lib/server/firebaseAdminClient";

const table = "product";

export const prerender = true;

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
	const tableSnapshot = await adminDB.collection(table).where("visible", "==", true).get();
	const products: Product[] = tableSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	})) as Product[];
	const categories = products.map((product) => product.categories).flat();
	const removedDuplicates = [...new Set(categories)];
	const entries = removedDuplicates.map((slug) => ({ slug: slug.replaceAll(" ", "-") }));

	return [{ slug: "all" }, ...entries];
}

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
