import { adminDB } from "$lib/server/firebaseAdminClient";

const table = "page";

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const tableSnapshot = await adminDB.collection(table).get();

	const pageData = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	const jsonString = JSON.stringify(pageData);

	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
