import { adminDB } from "$lib/server/firebaseAdminClient";

const table = "product";

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
	// const slug = url.searchParams.get("slug");

	const tableSnapshot = await adminDB.collection(table).where("visible", "==", true).get();
	// const tableSnapshot = slug
	// 	? await adminDB.collection(table).where("slug", "==", slug).where("visible", "==", true).get()
	// 	: await adminDB.collection(table).where("visible", "==", true).get();
	const products = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	return new Response(JSON.stringify(products), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
