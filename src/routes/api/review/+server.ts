import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	const { productSlug, review } = await request.json();

	if (!session) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});

	const { data: userAccount } = await supabaseAdmin
		.from("account")
		.select()
		.eq("user_id", session.user.id)
		.single();
	console.log("POST ~ userAccount:", userAccount);

	const { data: existingData } = await supabase
		.from("review")
		.select()
		.eq("user_id", session.user.id)
		.eq("product_slug", productSlug)
		.single();

	const createPayload = {
		user_id: session.user.id,
		user_name: userAccount.first_name,
		product_slug: productSlug,
		title: review.title,
		content: review.content,
		rating: review.rating
	};

	if (existingData) {
		const { data: updatedData } = await supabase
			.from("review")
			.update({ ...createPayload, created_at: new Date() })
			.eq("id", existingData.id)
			.select()
			.single();

		return new Response();
	}

	const { data: createdData, error } = await supabase
		.from("review")
		.insert(createPayload)
		.select()
		.single();

	return new Response(JSON.stringify({}), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { supabase } }) => {
	const productSlug = url.searchParams.get("slug");

	const { data } = await supabase.from("review").select().eq("product_slug", productSlug);

	if (!data) {
		return new Response(JSON.stringify([]), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const reviews = data.map((review) => ({
		userName: review.user_name,
		title: review.title,
		content: review.content,
		rating: review.rating,
		createdAt: review.created_at
	}));

	return new Response(JSON.stringify(reviews), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
