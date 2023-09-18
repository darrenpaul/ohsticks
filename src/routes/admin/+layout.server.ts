import authenticatedAdmin from "$lib/server/authenticatedAdmin";
import { error } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await authenticatedAdmin(getSession, supabase);
	if (!session) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	return { session };
};
