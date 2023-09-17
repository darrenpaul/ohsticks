import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";
import { adminRole } from "$lib/constants/roles";
import type { Product } from "$lib/types/product";

const table = "product";

const updateProduct = async (product: Product) => {
	return await adminDB.collection(table).doc(product.id).update(product);
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	// const accessToken = request.headers.get("x-access-token");

	// if (!accessToken) {
	// 	throw error(401, {
	// 		message: "unauthorized"
	// 	});
	// }

	// try {
	// 	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	// 	if (decodedIdToken.role !== adminRole) {
	// 		throw error(401, {
	// 			message: "unauthorized"
	// 		});
	// 	}
	// } catch (errorResponse) {
	// 	const knownError = errorResponse as HttpError;
	// 	throw error(knownError.status, {
	// 		message: knownError.body.message
	// 	});
	// }

	const tableSnapshot = await adminDB.collection(table).get();
	const products: Product[] = tableSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	})) as Product[];

	const updatePromises = products.map(async (product: Product) => {
		return await supabase.from("product").insert({
			name: product.name,
			slug: product.slug,
			description: product.description,
			categories: product.categories,
			visible: product.visible,
			currency_price: product.currencyPrice,
			content_sections: product.contentSections,
			feature_image: product.featureImage,
			images: product.images,
			meta: product.meta
		});
	});

	const abc = await Promise.all(updatePromises);
	console.log("abc:", abc);

	// const { data: shippingAddressData, error: shippingAddressError } = await supabase
	// 	.from("shipping_address")
	// 	.insert({
	// 		address_1: "address1",
	// 		address_2: "address2",
	// 		city: "city",
	// 		country: "country",
	// 		postal_code: "postalCode",
	// 		province: "province"
	// 	})
	// 	.select()
	// 	.single();
	// console.log("constproducts:Product[]=tableSnapshot.docs.map ~ products:", products);

	// const newProductStructure = products.map((product: Product) => {
	// 	return {
	// 		...product,
	// 		currencyPrice: {
	// 			eur: {
	// 				currency: "eur",
	// 				purchasePrice: 1,
	// 				markupPercentage: 0.5,
	// 				price: Number(1 * (1 + 50 / 100)).toFixed(2)
	// 			},
	// 			usd: {
	// 				currency: "usd",
	// 				purchasePrice: 1,
	// 				markupPercentage: 0.5,
	// 				price: Number(1 * (1 + 50 / 100)).toFixed(2)
	// 			},
	// 			gbp: {
	// 				currency: "gbp",
	// 				purchasePrice: 1,
	// 				markupPercentage: 0.5,
	// 				price: Number(1 * (1 + 50 / 100)).toFixed(2)
	// 			},
	// 			zar: {
	// 				currency: "zar",
	// 				purchasePrice: 5,
	// 				markupPercentage: 100,
	// 				price: Number(5 * (1 + 100 / 100)).toFixed(2)
	// 			}
	// 		}
	// 	};
	// });

	// const updatePromises = newProductStructure.map((product: Product) => updateProduct(product));
	// await Promise.all(updatePromises);

	return new Response(
		String({
			status: 200
		})
	);
};
