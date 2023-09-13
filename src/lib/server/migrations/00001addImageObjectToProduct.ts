import { adminDB } from "$lib/server/firebaseAdminClient";
import { app } from "$lib/firebase/firebaseClient";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import type { Product } from "$lib/types/product";

const table = "product";

const updateProduct = async (product: Product) => {
	return await adminDB.collection(table).doc(product.id).update(product);
};

export const upMigration = async () => {
	// GET ALL PRODUCTS FROM FIRESTORE
	const db = getFirestore(app);
	const tableCollection = collection(db, table);
	const tableSnapshot = await getDocs(tableCollection);

	const payload = (await tableSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	}))) as Product[];

	const newProductStructure = payload.map((product: Product) => {
		return {
			...product,
			featureImage: {
				src: product.featureImage,
				alt: "",
				width: 800,
				height: 800
			},
			images: product.images.map((image) => {
				return {
					src: image,
					alt: "",
					width: 800,
					height: 800
				};
			})
		};
	});

	const updatePromises = newProductStructure.map((product: Product) => updateProduct(product));
	await Promise.all(updatePromises);
};
