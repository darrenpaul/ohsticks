import authenticatedAdmin from "$lib/server/authenticatedAdmin";
import { error } from "@sveltejs/kit";

const table = "product";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const authenticated = await authenticatedAdmin(getSession, supabase);
	if (!authenticated) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const {
		name,
		slug,
		brand,
		categories,
		description,
		contentSections,
		currencyPrice,
		quantity,
		visible,
		featureImage,
		images,
		meta
	} = await request.json();

	await supabase
		.from(table)
		.insert({
			name,
			slug,
			brand,
			categories,
			description,
			content_sections: contentSections,
			currency_price: currencyPrice,
			quantity,
			visible,
			feature_image: featureImage,
			images,
			meta
		})
		.single();

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { supabase, getSession } }) => {
	const authenticated = await authenticatedAdmin(getSession, supabase);
	if (!authenticated) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const { data } = await supabase.from(table).select();
	const products = data.map((product) => ({
		id: product.id,
		name: product.name,
		slug: product.slug,
		brand: product.brand,
		categories: product.categories,
		description: product.description,
		contentSections: product.content_sections,
		currencyPrice: product.currency_price,
		quantity: product.quantity,
		visible: product.visible,
		featureImage: product.feature_image,
		images: product.images,
		meta: product.meta,
		createdAt: product.created_at,
		updatedAt: product.updated_at
	}));

	return new Response(JSON.stringify(products), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals: { supabase, getSession } }) => {
	const authenticated = await authenticatedAdmin(getSession, supabase);
	if (!authenticated) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const {
		id,
		name,
		slug,
		brand,
		categories,
		description,
		contentSections,
		currencyPrice,
		quantity,
		visible,
		featureImage,
		images,
		meta
	} = await request.json();

	await supabase
		.from(table)
		.update({
			name,
			slug,
			brand,
			categories,
			description,
			content_sections: contentSections,
			currency_price: currencyPrice,
			quantity,
			visible,
			feature_image: featureImage,
			images,
			meta,
			updated_at: new Date()
		})
		.eq("id", id)
		.select()
		.single();

	return new Response(
		String({
			status: 200
		})
	);
};
