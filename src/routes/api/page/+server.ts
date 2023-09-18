const table = "page";

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	// const tableSnapshot = await adminDB.collection(table).get();

	// const pageData = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	// const jsonString = JSON.stringify(pageData);

	return new Response(JSON.stringify({}), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
