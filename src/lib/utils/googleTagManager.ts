import { brandName } from "$lib/constants/site";
import type { CartItem } from "$lib/types/cart";
import type { OrderItem } from "$lib/types/order";
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

const trackBasicEvent = (event: string) => {
	dataLayer.push({
		event: event
	});
};

const trackEcommerceEvent = (event: string, eventData) => {
	dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
	dataLayer.push({
		event: event,
		...eventData
	});
};

export const addToCartEvent = (product: Product) => {
	const categories = formatProductCategories(product.categories);

	const eventData = {
		ecommerce: {
			currency: "EUR",
			value: product.price,
			items: [
				{
					item_id: product.id,
					item_name: product.name,
					price: product.price,
					item_brand: product.brand,
					index: 0,
					quantity: 1,
					item_list_id: "related_products",
					item_list_name: "Related Products",
					...categories
				}
			]
		}
	};

	trackEcommerceEvent("add_to_cart", eventData);
};

export const removeFromCartEvent = (cartItem: CartItem, index: number) => {
	const categories = formatProductCategories(cartItem.categories);

	const eventData = {
		ecommerce: {
			currency: "EUR",
			value: cartItem.price,
			items: [
				{
					item_id: cartItem.id,
					item_name: cartItem.name,
					price: cartItem.price,
					item_brand: cartItem.brand,
					index,
					quantity: 1,
					item_list_id: "related_products",
					item_list_name: "Related Products",
					...categories
				}
			]
		}
	};

	trackEcommerceEvent("remove_from_cart", eventData);
};

export const viewCartEvent = (cartItems: CartItem[]) => {
	const cartTotal = sumArrayNumbers(
		cartItems.map((item: CartItem) => Number(item.price) * item.quantity)
	);
	const items = cartItems.map((item: CartItem, index: number) => ({
		item_name: item.name,
		item_id: item.id,
		price: item.price,
		index,
		item_brand: item?.brand || "",
		quantity: item.quantity,
		item_list_id: "related_products",
		item_list_name: "Related Products",
		...formatProductCategories(item?.categories || [])
	}));

	const eventData = {
		ecommerce: {
			currency: "EUR",
			value: cartTotal,
			items
		}
	};

	trackEcommerceEvent("view_cart", eventData);
};

export const selectItemEvent = (product: Product, index: number) => {
	const categories = formatProductCategories(product.categories);

	const eventData = {
		ecommerce: {
			item_list_id: "related_products",
			item_list_name: "Related products",
			items: [
				{
					item_id: product.id,
					item_name: product.name,
					price: product.price,
					index,
					quantity: 1,
					item_brand: product.brand,
					item_list_id: "related_products",
					item_list_name: "Related Products",
					...categories
				}
			]
		}
	};

	trackEcommerceEvent("select_item", eventData);
};

export const viewItemEvent = (product: Product) => {
	const categories = formatProductCategories(product.categories);

	const eventData = {
		ecommerce: {
			currency: "EUR",
			value: product.price,
			items: [
				{
					item_id: product.id,
					item_name: product.name,
					price: product.price,
					index: 0,
					quantity: 1,
					item_brand: product.brand,
					item_list_id: "related_products",
					item_list_name: "Related Products",
					...categories
				}
			]
		}
	};

	trackEcommerceEvent("view_item", eventData);
};

export const viewItemListEvent = (products: Product[]) => {
	const items = products.map((item: Product, index) => ({
		item_name: item.name,
		item_id: item.id,
		price: item.price,
		index,
		item_brand: item?.brand || "",
		quantity: item.quantity,
		item_list_id: "related_products",
		item_list_name: "Related Products",
		...formatProductCategories(item?.categories || [])
	}));

	const eventData = {
		ecommerce: {
			item_list_id: "related_products",
			item_list_name: "Related products",
			items: items
		}
	};

	trackEcommerceEvent("view_item_list", eventData);
};

export const checkoutEvent = (cartItems: CartItem[]) => {
	const cartTotal = sumArrayNumbers(
		cartItems.map((item: CartItem) => Number(item.price) * item.quantity)
	);

	const items = cartItems.map((item: CartItem, index) => ({
		item_name: item.name,
		item_id: item.id,
		price: item.price,
		index,
		item_brand: item?.brand || "",
		quantity: item.quantity,
		item_list_id: "related_products",
		item_list_name: "Related Products",
		...formatProductCategories(item?.categories || [])
	}));

	const eventData = {
		ecommerce: {
			currency: "EUR",
			value: cartTotal,
			items
		}
	};

	trackEcommerceEvent("begin_checkout", eventData);
};

export const purchaseEvent = (orderId: string, orderItems: OrderItem[], shipping: number) => {
	const orderTotal = sumArrayNumbers(
		orderItems.map((item: OrderItem) => Number(item.price) * item.quantity)
	);

	const items = orderItems.map((item: OrderItem, index) => ({
		item_name: item.name,
		item_id: item.id,
		price: item.price,
		index,
		item_brand: item?.brand || brandName,
		quantity: item.quantity,
		item_list_id: "related_products",
		item_list_name: "Related Products",
		...formatProductCategories(item?.categories || [])
	}));

	const eventData = {
		ecommerce: {
			transaction_id: orderId,
			currency: "EUR",
			value: orderTotal,
			tax: 0.0,
			shipping: shipping,
			items
		}
	};

	trackEcommerceEvent("purchase", eventData);
};

export const newsletterSignupEvent = () => {
	trackBasicEvent("newsletter_signup");
};
