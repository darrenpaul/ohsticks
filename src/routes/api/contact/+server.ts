const table = "contact";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase } }) => {
	const { name, email, subject, message } = await request.json();

	const { error } = await supabase.from(table).insert({
		name,
		email,
		subject,
		message
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
