import { addDays, isAfter } from "date-fns";
import type { CartItem } from "$lib/types/cart";
import { error } from "@sveltejs/kit";
import { generateCartHashId, mergeCartItems } from "$lib/server/cartHelpers";
import { cartActionRemove } from "$lib/constants/cart";

const table = "cart";

// ADD/REMOVE ITEM TO CART
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const { cartItem, action } = await request.json();

	const { data } = await supabase.from(table).select().eq("user_id", session.user.id).single();

	if (data) {
		let cartItems = data.cart_items as CartItem[];

		if (action === cartActionRemove) {
			cartItems = cartItems.filter(
				(item) => generateCartHashId(item) !== generateCartHashId(cartItem)
			);
		} else {
			cartItems.push(cartItem);
		}

		if (cartItems.length === 0) {
			await supabase.from(table).delete().eq("user_id", session.user.id).single();
			return new Response(JSON.stringify({}), {
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		const mergedCartItems: CartItem[] = mergeCartItems(cartItems);

		const updatePayload = {
			user_id: session.user.id,
			cart_items: mergedCartItems,
			expiration: addDays(new Date(), 7)
		};

		const { data: updatedData } = await supabase
			.from(table)
			.update(updatePayload)
			.eq("user_id", session.user.id)
			.select()
			.single();

		const payload = {
			cartItems: updatedData.cart_items
		};

		return new Response(JSON.stringify(payload), {
			headers: {
				"Content-Type": "application/json"
			}
		});
		// }
	}

	// // No carts found, create new cart
	const createPayload = {
		user_id: session.user.id,
		cart_items: [cartItem],
		expiration: addDays(new Date(), 7)
	};

	const { data: createdData, error } = await supabase
		.from(table)
		.insert(createPayload)
		.select()
		.single();

	const payload = {
		cartItems: createdData.cart_items
	};

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// GET CART
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		error(401, {
        			message: "unauthorized"
        		});
	}

	const { data } = await supabase.from(table).select().eq("user_id", session.user.id).single();

	if (!data) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	// TODO: Reintroduce this
	// const cartData = await getLatestCart(tableSnapshot);
	// if (!cartData) {
	// 	return new Response(JSON.stringify({}), {
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		}
	// 	});
	// }

	// Delete Cart if expired
	if (isAfter(new Date(), new Date(data.expiration))) {
		await supabase.from(table).delete().eq("user_id", session.user.id).single();
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	// const syncedCartItems = await syncCartItemsAndProducts(data.cart_items, supabase);

	const payload = {
		cartItems: data.cart_items
	};

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// DELETE ITEM FROM CART
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		error(401, {
        			message: "unauthorized"
        		});
	}

	await supabase.from(table).delete().eq("user_id", session.user.id).single();
	return new Response(JSON.stringify({}), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
