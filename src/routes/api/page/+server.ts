import { app } from "$lib/firebase/firebaseClient";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import type { Product } from "$lib/types/product";

const table = "pages";

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const db = getFirestore(app);
	const tableCollection = collection(db, table);
	const tableSnapshot = await getDocs(tableCollection);

	const payload = (await tableSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	}))) as Product[];

	const jsonString = JSON.stringify(payload);

	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
