import authenticatedAdmin from "$lib/server/authenticatedAdmin.js";
import { error } from "@sveltejs/kit";

const table = "order";

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { supabase, getSession } }) => {
	const authenticated = await authenticatedAdmin(getSession, supabase);
	if (!authenticated) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const { data } = await supabase.from(table).select();

	const orders = data.map((order) => ({
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
export const PUT = async ({ request, locals: { supabase, getSession } }) => {
	const authenticated = await authenticatedAdmin(getSession, supabase);
	if (!authenticated) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const {
		id,
		customer,
		shippingAddress,
		items,
		paymentMethod,
		shippingMethod,
		subtotal,
		total,
		status
	} = await request.json();

	await supabase
		.from(table)
		.update({
			customer,
			shipping_address: shippingAddress,
			items,
			payment_method: paymentMethod,
			shipping_method: shippingMethod,
			subtotal,
			total,
			status,
			updated_at: new Date()
		})
		.eq("id", id)
		.select()
		.single();

	return new Response();
};
