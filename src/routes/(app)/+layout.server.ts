/** @type {import('./$types').PageLoad} */
export async function load({ fetch, locals: { safeGetSession } }) {
	const fetchConfig = {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	};

	const productResponsePromise = fetch("/api/product", fetchConfig);
	const pageResponsePromise = fetch("/api/page?slug=home", fetchConfig);

	const [productResponse, pageResponse] = await Promise.all([
		productResponsePromise,
		pageResponsePromise
	]);

	const products = await productResponse.json();
	const pageData = await pageResponse.json();

	return {
		session: await safeGetSession(),
		products,
		pageData
	};
}
