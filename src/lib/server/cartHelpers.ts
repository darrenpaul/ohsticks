import type { CartItem } from "$lib/types/cart";
import type { Product } from "$lib/types/product";

export const generateCartHashId = (cartItem: CartItem) => {
	const itemAttributeKeys = Object.keys(cartItem.attributes);
	itemAttributeKeys.sort();
	const cartItemAttributes = itemAttributeKeys.map(
		(key) => `${key}:${cartItem.attributes[key].trim()}`
	);

	const stringToHash = `${cartItem.id}:${cartItemAttributes.join("-")}`;
	const cleanedStringToHash = stringToHash.replaceAll("-", "").replaceAll(":", "").toLowerCase();
	return cleanedStringToHash;
};

export const mergeCartItems = (cartItems: CartItem[]) => {
	const mergedCartItems: { [prop: string]: CartItem } = {};

	cartItems.forEach((item) => {
		const cartHashId = generateCartHashId(item);
		if (mergedCartItems[cartHashId]) {
			mergedCartItems[cartHashId].quantity = item.quantity + mergedCartItems[cartHashId].quantity;
		} else {
			mergedCartItems[cartHashId] = item;
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
		const product = products.find((product: Product) => product.id === cartItem.id);

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
