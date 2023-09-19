import { error } from "@sveltejs/kit";
import type { Order, OrderItem } from "$lib/types/order.js";
import { sumArrayNumbers } from "$lib/utils/maths.js";
import { siteUrl } from "$lib/constants/site.js";
import { accountRoute } from "$lib/constants/routes/accountRoute.js";
import randomString from "$lib/utils/randomString";

const table = "order";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase } }) => {
	const { customer, shippingAddress, items, paymentMethod, shippingMethod } = await request.json();

	const subtotal = sumArrayNumbers(
		items.map((item: OrderItem) => Number(item.price) * Number(item.quantity))
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

	const { data: createdData } = await supabase.from(table).insert(createPayload).select().single();

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
export const PUT = async ({ url, fetch, locals: { supabase } }) => {
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

	const status = stripeData.payment_status;

	const timestamp = new Date();

	const { data: updatedData } = await supabase
		.from(table)
		.update({ status, updated_at: timestamp })
		.eq("id", orderId)
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
