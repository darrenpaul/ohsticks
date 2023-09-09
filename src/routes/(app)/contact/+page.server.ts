export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
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
			pageData
		}
	};
}
