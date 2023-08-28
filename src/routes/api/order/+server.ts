import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";
import { adminRole } from "$lib/constants/roles.js";
import { app } from "$lib/firebase/firebaseClient";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const table = "order";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const {
		email,
		country,
		firstName,
		lastName,
		address1,
		address2,
		city,
		province,
		postalCode,
		items
	} = await request.json();

	const order = await adminDB.collection(table).doc().set({
		email,
		country,
		firstName,
		lastName,
		address1,
		address2,
		city,
		province,
		postalCode,
		items
	});

	return new Response(JSON.stringify(order), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, url }) => {
	const id = url.searchParams.get("id");
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
		if (decodedIdToken.role !== adminRole) {
			throw error(401, {
				message: "unauthorized"
			});
		}
	} catch (errorResponse) {
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}

	const db = getFirestore(app);
	const tableCollection = collection(db, table);
	const tableSnapshot = await getDocs(tableCollection);

	let payload = await tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	if (id) {
		payload = payload.filter((item) => item.id === id);
	}

	const jsonString = JSON.stringify(payload);

	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request }) => {
	const { id, status } = await request.json();

	await adminDB.collection(table).doc(id).update({
		status
	});

	return new Response(
		String({
			status: 200
		})
	);
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
