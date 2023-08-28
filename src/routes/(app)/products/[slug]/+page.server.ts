import { app } from "$lib/firebase/firebaseClient";
import type { Product } from "$lib/types/product.js";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const table = "product";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	console.log("load ~ params:", params);
	const db = getFirestore(app);
	const tableCollection = collection(db, table);

	const productsSnapshot = await getDocs(tableCollection);
	const products = productsSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	})) as Product[];

	const filteredProducts =
		params.slug === "all"
			? products
			: products.filter((product) => product?.categories.includes(params.slug));

	if (products.length === 0) {
		return {
			status: 404,
			body: {
				message: "Product not found"
			}
		};
	}

	return {
		status: 200,
		body: { products: filteredProducts }
	};
}
