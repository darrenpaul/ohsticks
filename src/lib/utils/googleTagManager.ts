import { brandName } from "$lib/constants/site";
import type { CartItem } from "$lib/types/cart";
import type { Product } from "$lib/types/product";
import { sumArrayNumbers } from "$lib/utils/maths";

const formatProductCategories = (categories: string[]) => {
	const grouped = categories.map((category, index) => {
		if (index === 0) {
			return { item_category: category };
		}
		return { [`item_category${index + 1}`]: category };
	});

	return grouped.reduce((a, b) => Object.assign(a, b), {});
};

export const addToCartEvent = (product: Product) => {
	const categories = formatProductCategories(product.categories);
	dataLayer.push({ ecommerce: null });
	dataLayer.push({
		event: "add_to_cart",
		ecommerce: {
			currency: "EUR",
			value: product.price,
			items: [
				{
					item_name: product.name,
					item_id: product.id,
					price: product.price,
					brand: brandName,
					index: 0,
					quantity: 1,
					item_list_id: "related_products",
					item_list_name: "Related Products",
					...categories
				}
			]
		}
	});
};

export const productClickEvent = (product: Product, productPageUrl: string) => {
	console.warn("productClickEvent");
};

export const checkoutEvent = (cartItems: CartItem[]) => {
	const cartTotal = sumArrayNumbers(
		cartItems.map((item: CartItem) => Number(item.price) * item.quantity)
	);

	const products = cartItems.map((item: CartItem) => ({
		item_name: item.name,
		item_id: item.id,
		price: item.price,
		index: 0,
		item_brand: brandName,
		quantity: item.quantity,
		item_list_id: "related_products",
		item_list_name: "Related Products",
		...formatProductCategories(item?.categories || [])
	}));

	dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
	dataLayer.push({
		event: "begin_checkout",
		ecommerce: {
			currency: "EUR",
			value: cartTotal,
			items: products
		}
	});
};
