import { homeRoute } from "$lib/constants/routes/homeRoute.js";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get("code");

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, homeRoute.path);
};
