import type { OrderItem } from "$lib/types/order.js";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "$env/static/private";

const YOUR_DOMAIN = "http://127.0.0.1:5173";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27",
	appInfo: {
		// For sample support and debugging, not required for production:
		name: "stripe-samples/accept-a-payment/payment-element",
		version: "0.0.2",
		url: "https://github.com/stripe-samples"
	}
});

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const { order } = await request.json();

	const lineItems = order.items.map((product: OrderItem) => {
		return {
			price_data: {
				currency: "eur",
				unit_amount: Number(product.price) * 100,
				product_data: {
					name: product.name,
					description: product.description,
					images: [product.image.src]
				}
			},
			quantity: Number(product.quantity)
		};
	});

	const stripeUrlParams = ["session_id={CHECKOUT_SESSION_ID}", `order_id=${order.id}`];

	const session = await stripe.checkout.sessions.create({
		line_items: [...lineItems],
		client_reference_id: order.id,
		mode: "payment",
		success_url: `${YOUR_DOMAIN}/checkout/processing?${stripeUrlParams.join("&")}&status=success`,
		cancel_url: `${YOUR_DOMAIN}/checkout/processing?${stripeUrlParams.join("&")}&status=failed`
	});

	return new Response(JSON.stringify({ sessionUrl: session.url }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
