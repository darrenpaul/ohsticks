import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const email = "daaaaadadad@applesw.com";
	await adminAuth
		.getUserByEmail(email)
		.then((userRecord) => {
			// See the UserRecord reference doc for the contents of userRecord.
			console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
		})
		.catch((error) => {
			// console.log("Error fetching user data:", error);
			console.log("creating user account");
		});

	return new Response(JSON.stringify({}), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
