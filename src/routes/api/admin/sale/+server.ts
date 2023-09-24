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

	const { discountPercentage, productIds } = await request.json();

	const updatePromises = productIds.map(async (id) => {
		await supabase
			.from(table)
			.update({
				discount: discountPercentage,
				updated_at: new Date()
			})
			.eq("id", id)
			.select()
			.single();
	});

	const abc = await Promise.all(updatePromises);

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};
