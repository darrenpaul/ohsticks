const table = "newsletter";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase } }) => {
	const { email } = await request.json();

	// const { data } = await supabase.from(table).select("*").eq("email", email);
	// console.log("POST ~ data:", data)

	// if (data && data.length > 0) {
	// 	return new Response(
	// 		String({
	// 			status: 200,
	// 			body: "success"
	// 		})
	// 	);
	// }

	const { error } = await supabase.from(table).insert({
		email
	});

	if (error) {
		return new Response(
			String({
				status: 500,
				body: error.message
			})
		);
	}

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};
