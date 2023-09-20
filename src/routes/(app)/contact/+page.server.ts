// export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const pageSlug = "contact";
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
