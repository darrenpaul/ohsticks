import type { CartItem } from "$lib/types/cart";
import type { Product, ProductResponse } from "$lib/types/product";

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

export const getLatestCart = async () => {
	// // Multiple carts found, delete old carts and use the latest one
	// const userCarts: CartUser[] = tableSnapshot.docs.map((doc) => ({
	// 	id: doc.id,
	// 	...doc.data()
	// })) as CartUser[];
	// userCarts.sort((a: CartUser, b: CartUser) => b.createdAt.seconds - a.createdAt.seconds);
	// const cartData = userCarts.shift() as CartUser;
	// if (userCarts.length > 0) {
	// 	// Delete old carts
	// 	userCarts.forEach(async (cart) => {
	// 		await adminDB.collection("cart").doc(cart.id).delete();
	// 	});
	// }
	// const syncedCartItems = await syncCartItemsAndProducts(cartData.cartItems);
	// return { ...cartData, cartItems: syncedCartItems };
};

export const syncCartItemsAndProducts = async (cartItems: CartItem[], supabase) => {
	const { data } = await supabase.from("product").select().eq("visible", true);
	const products = data;

	const syncedWithProducts = cartItems.map((cartItem) => {
		const product: ProductResponse = products.find(
			(product: Product) => product.id === cartItem.id
		) as ProductResponse;

		if (!product) return undefined;
		return {
			...cartItem,
			image: {
				...product.featureImage
			},
			price: product.currencyPrice[cartItem.currency].price,
			name: product.name,
			description: product.description,
			brand: product.brand,
			id: product.id,
			categories: product.categories
		};
	});
	const removedUndefined = syncedWithProducts.filter((item) => item !== undefined);

	return removedUndefined;
};
