import { addDays, isAfter } from "date-fns";
import type { CartItem } from "$lib/types/cart";
import { mergeCartItems } from "$lib/server/cartHelpers";
import { cartActionRemove } from "$lib/constants/cart";

const table = "cart_guest";

// ADD ITEM TO CART
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase } }) => {
	const cartKey = request.headers.get("cart-key");
	const { cartItem, action } = await request.json();

	if (cartKey) {
		const { data } = await supabase.from(table).select().eq("id", cartKey).single();

		if (data) {
			let cartItems = data.cart_items as CartItem[];

			if (action === cartActionRemove) {
				cartItems = cartItems.filter((item) => item.id !== cartItem.id);
			} else {
				cartItems.push(cartItem);
			}

			if (cartItems.length === 0) {
				await supabase.from(table).delete().eq("id", cartKey).single();
				return new Response(JSON.stringify({}), {
					headers: {
						"Content-Type": "application/json"
					}
				});
			}

			const mergedCartItems = mergeCartItems(cartItems);

			const updatePayload = {
				cart_items: mergedCartItems,
				expiration: addDays(new Date(), 7)
			};

			const { data: updatedData } = await supabase
				.from(table)
				.update(updatePayload)
				.eq("id", cartKey)
				.select()
				.single();

			const payload = {
				cartKey: updatedData.id,
				cartItems: updatedData.cart_items
			};

			return new Response(JSON.stringify(payload), {
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		// If cartData is null, then a new cart will be created
	}

	const { data } = await supabase
		.from(table)
		.insert({
			cart_items: [cartItem],
			expiration: addDays(new Date(), 7)
		})
		.select()
		.single();

	const payload = {
		cartItems: data.cart_items,
		cartKey: data.id
	};

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// GET CART
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, locals: { supabase } }) => {
	const cartKey = request.headers.get("cart-key");

	if (!cartKey) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const { data } = await supabase.from(table).select().eq("id", cartKey).single();

	if (!data) {
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	if (isAfter(new Date(), new Date(data.expiration))) {
		await supabase.from(table).delete().eq("id", cartKey).single();
		return new Response(JSON.stringify({}), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const cartItems = data.cart_items as CartItem[];
	// const syncedCartItems = await syncCartItemsAndProducts(cartItems, supabase);

	return new Response(JSON.stringify({ cartKey: cartKey, cartItems: cartItems }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// DELETE ITEM FROM CART
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request, locals: { supabase } }) => {
	const cartKey = request.headers.get("cart-key");

	await supabase.from(table).delete().eq("id", cartKey).single();
	return new Response(JSON.stringify({}), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
