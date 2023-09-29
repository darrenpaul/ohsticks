import { delivered } from "$lib/constants/orderUpdate";
import type { Order } from "$lib/types/order";
import type { Product } from "$lib/types/product";

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, locals: { getSession } }) {
	const productSlug = params.slug;
	const session = await getSession();

	const fetchConfig = {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	};

	const fetchPromises = [];

	fetchPromises.push(fetch(`/api/review?slug=${productSlug}`, fetchConfig));
	if (session) {
		fetchPromises.push(fetch(`/api/order`, fetchConfig));
	}

	const fetchPromisesResolved = await Promise.all(fetchPromises);
	const reviews = await fetchPromisesResolved[0].json();

	if (!session) {
		return {
			reviews,
			canReview: false
		};
	}

	const orders = await fetchPromisesResolved[1].json();
	if (!orders || orders.length > 0) {
		return {
			reviews,
			canReview: false
		};
	}

	// check if user has ordered this product and it has been delivered
	const filterOutNotDelivered = orders.filter((order: Order) => order.status === delivered);
	const productsFromOrders = filterOutNotDelivered.map((order: Order) => order.items).flat();
	const matchedProducts = productsFromOrders.filter(
		(product: Product) => product.slug === productSlug
	);

	const canReview = !!matchedProducts.length;

	return {
		reviews,
		canReview
	};
}

export const prerender = false;
