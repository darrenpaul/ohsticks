import { productTable } from "$lib/constants/databaseTables";
import type { Product } from "$lib/types/product";

// GET ALL PRODUCTS
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { supabase } }) => {
	const currency = "eur";

	const { data } = await supabase.from(productTable).select().eq("visible", true);
	const products = data;

	if (!products) return new Response("No products found", { status: 404 });

	const productsFormatted: Product[] = products?.map((product) => {
		return {
			id: product.id,
			name: product.name,
			slug: product.slug,
			categories: product.categories,
			description: product.description,
			attributes: product.attributes,
			contentSections: product.content_sections,
			quantity: product.quantity,
			visible: product.visible,
			featureImage: product.feature_image,
			images: product.images,
			meta: product.meta,
			brand: product.brand,
			price: product.currency_price[currency].price,
			discount: product.discount,
			currency: currency
		};
	});

	return new Response(JSON.stringify(productsFormatted), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
