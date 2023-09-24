import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import type { CartItem } from "$lib/types/cart.js";
import type { Order, OrderItem } from "$lib/types/order.js";
import { calculateDiscountPrice, sumArrayNumbers } from "$lib/utils/maths.js";
import { createClient } from "@supabase/supabase-js";

const table = "order";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase } }) => {
	const { customer, shippingAddress, items, paymentMethod, shippingMethod } = await request.json();

	const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});

	const subtotal = sumArrayNumbers(
		items.map(
			(item: CartItem) =>
				calculateDiscountPrice(Number(item.price), item.discount) * Number(item.quantity)
		)
	).toFixed(2);

	const total = (Number(subtotal) + Number(shippingMethod.price)).toFixed(2);

	const createPayload = {
		email: customer.email,
		customer,
		shipping_address: shippingAddress,
		payment_method: paymentMethod,
		items,
		subtotal,
		shipping_method: shippingMethod,
		total,
		updated_at: new Date()
	};

	const { data: createdData } = await supabaseAdmin
		.from("order")
		.insert(createPayload)
		.select()
		.single();

	const payload = {
		id: createdData.id,
		customer: createdData.customer,
		shippingAddress: createdData.shipping_address,
		paymentMethod: createdData.payment_method,
		items: createdData.items,
		subtotal: createdData.subtotal,
		shippingMethod: createdData.shipping_method,
		total: createdData.total,
		status: createdData.status
	};

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data } = await supabase
		.from(table)
		.select()
		.eq("email", session?.user.email);

	const orders = data.map((order: Order) => ({
		id: order.id,
		customer: order.customer,
		shippingAddress: order.shipping_address,
		paymentMethod: order.payment_method,
		items: order.items,
		subtotal: order.subtotal,
		shippingMethod: order.shipping_method,
		total: order.total,
		status: order.status,
		createdAt: order.created_at,
		updatedAt: order.updated_at
	}));

	return new Response(JSON.stringify(orders), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ url, fetch, locals: { getSession } }) => {
	const supabaseSession = await getSession();
	const sessionId = url.searchParams.get("session_id");
	const orderId = url.searchParams.get("order_id");

	if (!sessionId) {
		return new Response(JSON.stringify({ error: "missing session_id" }), {
			headers: {
				"Content-Type": "application/json"
			},
			status: 400
		});
	}
	if (!orderId) {
		return new Response(JSON.stringify({ error: "missing order_id" }), {
			headers: {
				"Content-Type": "application/json"
			},
			status: 400
		});
	}

	const stripeResponse = await fetch(`/api/stripe/retrieve-payment?session_id=${sessionId}`, {
		method: "GET"
	});

	const stripeData = await stripeResponse.json();

	const userId = supabaseSession?.user?.id || null;
	const status = stripeData.payment_status;
	const stripeCustomerEmail = stripeData.customer_email;
	const paymentIntentId = stripeData.payment_intent;

	const timestamp = new Date();

	const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});

	const { data: updatedData, error } = await supabaseAdmin
		.from(table)
		.update({ status, stripe_payment_id: paymentIntentId, updated_at: timestamp, user_id: userId })
		.eq("id", orderId)
		.eq("email", stripeCustomerEmail)
		.select()
		.single();

	return new Response(
		JSON.stringify({
			status: updatedData.status,
			items: updatedData.items,
			shippingMethod: updatedData.shipping_method
		}),
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	);
};
