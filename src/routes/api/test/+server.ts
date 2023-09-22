import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ locals: { supabase } }) => {
	const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});

	const { data, error } = await supabaseAdmin.from("order").select();

	console.log("POST ~ error:", error);
	console.log("POST ~ data:", data);

	return new Response();
};
