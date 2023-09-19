import { createProducts } from "$lib/types/product.js";
const table = "product";

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { supabase } }) => {
	const currency = url.searchParams.get("currency") || "eur";
	const slug = url.searchParams.get("slug");

	let products;

	if (slug) {
		const { data } = await supabase.from(table).select().eq("visible", true, "slug", slug);
		products = data;
	} else {
		const { data } = await supabase.from(table).select().eq("visible", true);
		products = data;
	}

	const productsFormatted = createProducts(products, currency);

	return new Response(JSON.stringify(productsFormatted), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
