import sendOrderEmail from "$lib/server/utils/email/sendOrderEmail.js";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async () => {
	sendOrderEmail({});

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};
