import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";
import { adminRole, userRole } from "$lib/constants/roles";
import { app } from "$lib/firebase/firebaseClient";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import type { FirebaseError } from "firebase-admin";

const table = "user";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const {
		firstName,
		LastName,
		emailAddress,
		phoneNumber,
		billingAddress,
		shippingAddress,
		password
	} = await request.json();

	let userRecord;

	try {
		userRecord = await adminAuth.createUser({
			email: emailAddress,
			emailVerified: false,
			phoneNumber: phoneNumber,
			password: password,
			displayName: `${firstName} ${LastName}`,
			photoURL: "http://www.example.com/12345678/photo.png",
			disabled: false
		});
	} catch (errorResponse: unknown) {
		const knownError = errorResponse as FirebaseError;

		const errorCode = knownError.code === "auth/email-already-exists" ? 409 : 500;
		throw error(errorCode, {
			message: knownError.message
		});
	}

	const userUID = userRecord.uid;

	try {
		const db = getFirestore(app);
		const documentReference = doc(db, table, userUID);
		const tableSnapshot = await getDoc(documentReference);
		if (tableSnapshot.exists()) {
			throw error(409, {
				message: "User already exists"
			});
		}

		await adminDB.collection(table).doc(userUID).set({
			firstName,
			LastName,
			emailAddress,
			phoneNumber,
			billingAddress,
			shippingAddress,
			role: userRole
		});

		adminAuth.setCustomUserClaims(userUID, { role: "user" });
		// Change to admin when needed
		// adminAuth.setCustomUserClaims(userUID, { role: "user" });

		return new Response();
	} catch (errorResponse: unknown) {
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}
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
	const {
		firstName,
		LastName,
		emailAddress,
		phoneNumber,
		billingAddress,
		shippingAddress,
		password
	} = await request.json();
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);

		const id = decodedIdToken.uid;

		await adminDB.collection(table).doc(id).update({
			firstName,
			LastName,
			emailAddress,
			phoneNumber,
			billingAddress,
			shippingAddress,
			password
		});

		return new Response(
			String({
				status: 200
			})
		);
	} catch (errorResponse) {
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}
};

// DELETE
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);

		const uid = decodedIdToken.uid;

		await adminAuth.deleteUser(uid);
		await adminDB.collection(table).doc(uid).delete();

		return new Response(
			String({
				status: 200
			})
		);
	} catch (errorResponse) {
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}
};
