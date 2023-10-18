import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { orderTable } from "$lib/constants/databaseTables";
import type { CartItem } from "$lib/types/cart";
import type { Order, NewSbOrder } from "$lib/types/order";
import { calculateDiscountPrice, sumArrayNumbers } from "$lib/utils/maths";
import { generateOrderId } from "$lib/utils/order.js";
import { createClient } from "@supabase/supabase-js";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const { customer, shippingAddress, items, paymentMethod, shippingMethod } = await request.json();

	const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});

	const pricesAfterDiscount = items.map((item: CartItem) =>
		calculateDiscountPrice(item.price, item.discount, item.quantity)
	);

	const subtotal = sumArrayNumbers(pricesAfterDiscount);

	const total = sumArrayNumbers([Number(subtotal), Number(shippingMethod.price)]);

	const orderId = generateOrderId(customer.email);

	const newOrderPayload: NewSbOrder = {
		id: orderId,
		email: customer.email,
		customer,
		shipping_address: shippingAddress,
		payment_method: paymentMethod,
		items,
		subtotal,
		shipping_method: shippingMethod,
		currency: "eur",
		total
	};

	const { data: newOrder } = await supabaseAdmin
		.from("order")
		.insert(newOrderPayload)
		.select()
		.single();

	const payload: Order = {
		id: newOrder.id,
		customer: newOrder.customer,
		shippingAddress: newOrder.shipping_address,
		paymentMethod: newOrder.payment_method,
		items: newOrder.items,
		subtotal: newOrder.subtotal,
		shippingMethod: newOrder.shipping_method,
		total: newOrder.total,
		status: newOrder.status,
		currency: newOrder.currency,
		created_at: newOrder.created_at,
		updated_at: newOrder.updated_at
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
		.from(orderTable)
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
// TODO: might be a security issue here, as anyone can update an order if they know the order id

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

	const { data: updatedData } = await supabaseAdmin
		.from(orderTable)
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
