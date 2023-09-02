import { app } from "$lib/firebase/firebaseClient";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { getDoc, DocumentReference } from "firebase/firestore";

const table = "product";

const getReference = async (documentReference) => {
	const res = await documentReference.get();
	const data = res.data();

	if (data && documentReference.id) {
		data.uid = documentReference.id;
	}

	return data;
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const db = getFirestore(app);
	const tableCollection = collection(db, table);
	const tableSnapshot = await getDocs(tableCollection);
	const products = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	const pagesCollection = collection(db, "pages");
	const pagesSnapshot = await getDocs(pagesCollection);

	const pageData = pagesSnapshot.docs.map((doc) => {
		return { id: doc.id, ...doc.data() };
	})[0];
	pageData.featureCarousel = pageData.featureCarousel.map((item) =>
		products.find((product) => product.id === item)
	);

	return {
		status: 200,
		body: {
			products,
			pageData
		}
	};
}
