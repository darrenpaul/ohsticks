import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";
import { auth } from "$lib/firebase/firebaseClient";
import randomString from "$lib/utils/randomString.js";
import { sendPasswordResetEmail } from "firebase/auth";
import type { OrderItem } from "$lib/types/order.js";
import { sumArrayNumbers } from "$lib/utils/maths.js";
import { adminRole } from "$lib/constants/roles";

const table = "order";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, fetch }) => {
	const { customer, shippingAddress, items, paymentMethod, shippingMethod } = await request.json();

	await adminAuth.getUserByEmail(customer.email).catch(async () => {
		await fetch("/api/account", {
			method: "POST",
			body: JSON.stringify({
				firstName: customer.firstName,
				lastName: customer.lastName,
				emailAddress: customer.email,
				password: randomString(20, false, true),
				shippingAddress: shippingAddress
			})
		});
		await sendPasswordResetEmail(auth, customer.email);
	});

	const orderReference = await adminDB.collection(table).doc();

	const subtotal = sumArrayNumbers(
		items.map((item: OrderItem) => Number(item.price) * Number(item.quantity))
	).toFixed(2);

	const total = (Number(subtotal) + Number(shippingMethod.price)).toFixed(2);

	const timestamp = new Date();

	const payload = {
		customer,
		shippingAddress,
		paymentMethod,
		items,
		subtotal,
		shippingMethod,
		total,
		createdAt: timestamp,
		updatedAt: timestamp
	};

	orderReference.set(payload);

	return new Response(
		JSON.stringify({
			id: orderReference.id,
			...payload
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
	const orderId = url.searchParams.get("id");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	if (!decodedIdToken || decodedIdToken.role !== adminRole) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const tableSnapshot = await adminDB.collection(table).get();
	const tableData = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	if (orderId) {
		const order = tableData.find((order) => order.id === orderId);

		if (!order) {
			throw error(404, {
				message: "order not found"
			});
		}

		return new Response(JSON.stringify({ order }), {
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	return new Response(JSON.stringify(tableData), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ url, fetch, request }) => {
	const accessToken = request.headers.get("x-access-token");
	const {
		id,
		customer,
		shippingAddress,
		items,
		paymentMethod,
		shippingMethod,
		subtotal,
		total,
		createdAt,
		status
	} = await request.json();

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	if (!decodedIdToken || decodedIdToken.role !== adminRole) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const timestamp = new Date();

	await adminDB.collection(table).doc(id).update({
		customer,
		shippingAddress,
		items,
		paymentMethod,
		shippingMethod,
		subtotal,
		total,
		createdAt,
		status,
		updatedAt: timestamp
	});

	return new Response();
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
