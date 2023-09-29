/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const pageSlug = "collection";
	const pageResponse = await fetch(`/api/page?slug=${pageSlug}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const pageData = await pageResponse.json();

	return {
		pageData
	};
}

export const prerender = true;
