import { error } from "@sveltejs/kit";
import type { Order, OrderItem } from "$lib/types/order.js";
import { sumArrayNumbers } from "$lib/utils/maths.js";

const table = "order";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase } }) => {
	const { customer, shippingAddress, items, paymentMethod, shippingMethod } = await request.json();

	// TODO: create account if not exists
	// await adminAuth.getUserByEmail(customer.email).catch(async () => {
	// 	await fetch("/api/account", {
	// 		method: "POST",
	// 		body: JSON.stringify({
	// 			firstName: customer.firstName,
	// 			lastName: customer.lastName,
	// 			emailAddress: customer.email,
	// 			password: randomString(20, false, true),
	// 			shippingAddress: shippingAddress
	// 		})
	// 	});
	// 	await sendPasswordResetEmail(auth, customer.email);
	// });

	// const orderReference = await adminDB.collection(table).doc();

	const subtotal = sumArrayNumbers(
		items.map((item: OrderItem) => Number(item.price) * Number(item.quantity))
	).toFixed(2);

	const total = (Number(subtotal) + Number(shippingMethod.price)).toFixed(2);

	const createPayload = {
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
export const GET = async ({ url, locals: { supabase } }) => {
	const orderId = url.searchParams.get("id");

	if (orderId) {
		const { data } = await supabase.from(table).select().eq("id", orderId).single();

		if (!data) {
			throw error(404, {
				message: "order not found"
			});
		}

		const payload = {
			id: data.id,
			customer: data.customer,
			shippingAddress: data.shipping_address,
			paymentMethod: data.payment_method,
			items: data.items,
			subtotal: data.subtotal,
			shippingMethod: data.shipping_method,
			total: data.total,
			status: data.status
		};

		return new Response(JSON.stringify(payload), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const { data } = await supabase.from(table).select();

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
