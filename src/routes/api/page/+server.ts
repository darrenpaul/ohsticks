const table = "page";

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { supabase } }) => {
	const slug = url.searchParams.get("slug");
	const { data } = await supabase.from(table).select().eq("slug", slug).single();

	const pageData = {
		title: data.title,
		description: data.description,
		slug: data.slug,
		openGraph: data.open_graph,
		twitter: data.twitter
	};

	return new Response(JSON.stringify(pageData), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
