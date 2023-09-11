export const prerender = true;
export const ssr = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const productResponse = await fetch("/api/product", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const products = await productResponse.json();

	const pageResponse = await fetch("/api/page", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const pageData = await pageResponse.json();

	return {
		products,
		pageData
	};
}
