import * as amp from "@sveltejs/amp";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	let buffer = "";
	return await resolve(event, {
		transformPageChunk: ({ html, done }) => {
			buffer += html;
			if (done) return amp.transform(buffer);
		}
	});
}
