import authenticatedAdmin from "$lib/server/authenticatedAdmin";
import { error } from "@sveltejs/kit";

export const load = async ({ fetch, locals: { supabase, getSession } }) => {
	const session = await authenticatedAdmin(getSession, supabase);
	if (!session) {
		// supabase.auth.signOut();
		throw error(401, {
			message: "unauthorized"
		});
	}

	const orderResponse = await fetch("/api/admin/order", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const orders = await orderResponse.json();

	return { session, orders };
};
