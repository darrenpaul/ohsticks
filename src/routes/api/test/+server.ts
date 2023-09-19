// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ locals: { supabase } }) => {
	const { data } = await supabase.auth.signUp({
		email: "darrenpaul@duck.com",
		password: "asdasdasda",
		options: {
			emailRedirectTo: `http://127.0.0.1:5173/test/auth/callback`
		}
	});
	console.log("POST ~ abc:", data.user.id);

	return new Response();
};
