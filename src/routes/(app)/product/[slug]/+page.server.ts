import { delivered } from "$lib/constants/orderUpdate.js";

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, locals: { getSession } }) {
	const productSlug = params.slug;
	const session = await getSession();

	const reviewsResponse = await fetch(`/api/review?slug=${productSlug}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const reviews = await reviewsResponse.json();

	if (!session) {
		return {
			reviews
		};
	}

	const ordersResponse = await fetch("/api/order", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const orders = await ordersResponse.json();

	// check if user has ordered this product and it has been delivered
	const filterOutNotDelivered = orders.filter((order) => order.status === delivered);
	const productsFromOrders = filterOutNotDelivered.map((order) => order.items).flat();
	const matchedProducts = productsFromOrders.filter((product) => product.slug === productSlug);

	const canReview = !!matchedProducts.length;

	return {
		reviews,
		canReview
	};
}
