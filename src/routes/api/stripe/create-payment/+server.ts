import type { OrderItem } from "$lib/types/order";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY, STRIPE_REDIRECT_DOMAIN } from "$env/static/private";
import { calculateDiscountPrice } from "$lib/utils/maths";

// DOCUMENTATION
// https://stripe.com/docs/api/checkout/sessions

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
				currency: order.currency,
				unit_amount: Number(calculateDiscountPrice(product.price, product.discount, 1)) * 100,
				product_data: {
					name: product.name,
					description: product.description,
					images: [product.image.src],
					tax_code: "txcd_20090028"
				},
				tax_behavior: "inclusive"
			},
			quantity: Number(product.quantity)
		};
	});

	const stripeUrlParams = ["session_id={CHECKOUT_SESSION_ID}", `order_id=${order.id}`];

	const baseStripeUrl = `${STRIPE_REDIRECT_DOMAIN}/checkout/processing`;
	const successUrl = `${baseStripeUrl}?${stripeUrlParams.join("&")}&status=success`;
	const cancelUrl = `${baseStripeUrl}?${stripeUrlParams.join("&")}&status=failed`;

	const session = await stripe.checkout.sessions.create({
		line_items: [...lineItems],
		client_reference_id: order.id,
		mode: "payment",
		customer_email: order.customer.email,
		shipping_options: [
			{
				shipping_rate: order.shippingMethod.id
			}
		],
		success_url: successUrl,
		cancel_url: cancelUrl,
		automatic_tax: {
			enabled: true
		},
		tax_id_collection: {
			enabled: true
		}
	});

	return new Response(JSON.stringify({ sessionUrl: session.url }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
