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
	const matchProducts = orders.filter((order) => {
		return order.items.filter((item) => item.slug === productSlug);
	});
	const canReview = !!matchProducts.find((order) => order.status === delivered);
	console.log("load ~ canReview:", productSlug);

	return {
		reviews,
		canReview
	};
}
