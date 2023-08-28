import { app } from "$lib/firebase/firebaseClient";
import type { Product } from "$lib/types/product.js";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const table = "product";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const db = getFirestore(app);
	const tableCollection = collection(db, table);

	const tableQuery = query(tableCollection, where("slug", "==", params.slug));
	const productSnapshot = await getDocs(tableQuery);

	const product = productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);

	const relatedProductsSnapshot = await getDocs(tableCollection);
	const relatedProducts = relatedProductsSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	}));

	if (product.length === 0) {
		return {
			status: 404,
			body: {
				message: "Product not found"
			}
		};
	}

	return {
		status: 200,
		body: { product: product[0], relatedProducts }
	};
}
