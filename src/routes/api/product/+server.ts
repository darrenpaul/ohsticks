import { adminDB } from "$lib/server/firebaseAdminClient";
import { createProducts, type ProductResponse } from "$lib/types/product.js";
const table = "product";

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const currency = url.searchParams.get("currency") || "eur";
	const slug = url.searchParams.get("slug");

	let tableSnapshot;

	if (slug) {
		tableSnapshot = await adminDB
			.collection(table)
			.where("slug", "==", slug)
			.where("visible", "==", true)
			.get();
	} else {
		tableSnapshot = await adminDB.collection(table).where("visible", "==", true).get();
	}

	// const tableSnapshot = slug
	// 	? await adminDB.collection(table).where("slug", "==", slug).where("visible", "==", true).get()
	// 	: await adminDB.collection(table).where("visible", "==", true).get();
	const products = tableSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	})) as ProductResponse[];

	const cleanProducts = createProducts(products, currency);

	return new Response(JSON.stringify(cleanProducts), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
