// import { adminDB } from "$lib/server/firebaseAdminClient";
// import { db } from "$lib/firebase/firebaseClient";
// import { collection, getDocs, query, where } from "firebase/firestore";

const table = "newsletter";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	// const { email } = await request.json();
	// const tableReference = collection(db, table);

	// const tableQuery = query(tableReference, where("email", "==", email));
	// const querySnapshot = await getDocs(tableQuery);

	// if (querySnapshot.empty) {
	// 	await adminDB.collection(table).doc().set({
	// 		email
	// 	});
	// }

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};
