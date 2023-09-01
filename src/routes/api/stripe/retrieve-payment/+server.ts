import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27",
	appInfo: {
		// For sample support and debugging, not required for production:
		name: "stripe-samples/accept-a-payment/payment-element",
		version: "0.0.2",
		url: "https://github.com/stripe-samples"
	}
});

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const sessionId = url.searchParams.get("session_id");

	if (!sessionId) {
		return new Response(JSON.stringify({ error: "missing session_id" }), {
			headers: {
				"Content-Type": "application/json"
			},
			status: 400
		});
	}

	const session = await stripe.checkout.sessions.retrieve(sessionId);

	return new Response(JSON.stringify(session), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
