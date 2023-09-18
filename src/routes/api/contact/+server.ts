// import { adminDB } from "$lib/server/firebaseAdminClient";

const table = "contact";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const { name, email, subject, message } = await request.json();

	// await adminDB.collection(table).doc().set({
	// 	name,
	// 	email,
	// 	subject,
	// 	message
	// });

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};
