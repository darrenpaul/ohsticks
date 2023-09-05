import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";
import { adminRole } from "$lib/constants/roles";
import { app, db } from "$lib/firebase/firebaseClient";
import { getFirestore, collection, getDocs, where, query, documentId } from "firebase/firestore";

const table = "order";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const { customer, shippingAddress, billingAddress, items, paymentMethod } = await request.json();

	const orderReference = await adminDB.collection(table).doc();

	orderReference.set({
		customer,
		shippingAddress,
		billingAddress,
		paymentMethod,
		items
	});

	return new Response(
		JSON.stringify({
			id: orderReference.id,
			customer,
			shippingAddress,
			billingAddress,
			paymentMethod,
			items
		}),
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	);
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, url }) => {
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const orderId = url.searchParams.get("id");

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);

		const tableSnapshot = await adminDB
			.collection(table)
			.where("customer.email", "==", decodedIdToken.email)
			.get();

		const tableData = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		if (orderId) {
			const order = tableData.find((order) => order.id === orderId);

			if (!order) {
				throw error(404, {
					message: "order not found"
				});
			}

			const jsonString = JSON.stringify({ order });

			return new Response(jsonString, {
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		const orders = tableData;

		const jsonString = JSON.stringify({ orders });

		return new Response(jsonString, {
			headers: {
				"Content-Type": "application/json"
			}
		});
	} catch (errorResponse) {
		console.log(errorResponse);
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, url, fetch }) => {
	const sessionId = url.searchParams.get("session_id");
	const orderId = url.searchParams.get("order_id");

	if (!sessionId) {
		return new Response(JSON.stringify({ error: "missing session_id" }), {
			headers: {
				"Content-Type": "application/json"
			},
			status: 400
		});
	}
	if (!orderId) {
		return new Response(JSON.stringify({ error: "missing order_id" }), {
			headers: {
				"Content-Type": "application/json"
			},
			status: 400
		});
	}

	const stripeResponse = await fetch(`/api/stripe/retrieve-payment?session_id=${sessionId}`, {
		method: "GET"
	});

	const stripeData = await stripeResponse.json();

	const status = stripeData.payment_status;

	await adminDB.collection(table).doc(orderId).update({
		status
	});

	return new Response(JSON.stringify({ status }), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// DELETE
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
	const { id } = await request.json();

	await adminDB.collection(table).doc(id).delete();

	return new Response(
		String({
			status: 200
		})
	);
};
