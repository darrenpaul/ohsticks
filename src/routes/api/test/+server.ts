import md5Hash from "$lib/server/md5Hash.js";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const acb = await md5Hash("test");
	console.log("POST ~ acb:", acb);

	return new Response();
};
