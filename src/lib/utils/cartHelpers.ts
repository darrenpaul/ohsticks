import type { CartItem } from "$lib/types/cart";

export const mergeCartItems = (cartItems: CartItem[]) => {
	const mergedCartItems: { [prop: string]: CartItem } = {};

	cartItems.forEach((item) => {
		if (mergedCartItems[item.id]) {
			mergedCartItems[item.id].quantity = item.quantity + mergedCartItems[item.id].quantity;
		} else {
			mergedCartItems[item.id] = item;
		}
	});

	return Object.values(mergedCartItems);
};
