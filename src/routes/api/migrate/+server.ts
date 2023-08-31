import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";
import { adminRole } from "$lib/constants/roles";
import { app } from "$lib/firebase/firebaseClient";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import type { Product } from "$lib/types/product";

const table = "product";

const updateProduct = async (product: Product) => {
	console.log("updating product", product.id);
	return await adminDB.collection(table).doc(product.id).update(product);
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
		if (decodedIdToken.role !== adminRole) {
			throw error(401, {
				message: "unauthorized"
			});
		}
	} catch (errorResponse) {
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}

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

	return new Response(
		String({
			status: 200
		})
	);
};
