import { app } from "$lib/firebase/firebaseClient";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const table = "product";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const db = getFirestore(app);
	const tableCollection = collection(db, table);
	const tableSnapshot = await getDocs(tableCollection);

	return {
		status: 200,
		body: { products: tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) }
	};
}
