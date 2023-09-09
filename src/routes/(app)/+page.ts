export const prerender = true;
export const ssr = false;

/** @type {import('./$types').PageLoad} */
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
		status: 200,
		body: {
			products,
			pageData
		}
	};
}
