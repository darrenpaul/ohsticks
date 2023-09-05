/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const slug = params.slug;

	const response = await fetch("/api/admin/page", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const pages = await response.json();

	const page = pages.find((page) => page.id === slug);

	if (!page) {
		return {
			status: 404,
			body: {
				message: "Product not found"
			}
		};
	}

	return {
		status: 200,
		body: { page: page }
	};
}
