import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";
import { userRole } from "$lib/constants/roles";
import type { FirebaseError } from "firebase-admin";

const table = "user";

const createAuthenticationUser = async ({
	emailAddress,
	phoneNumber,
	password,
	firstName,
	LastName
}) => {
	try {
		return await adminAuth.createUser({
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
};

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const { firstName, lastName, emailAddress, shippingAddress, password } = await request.json();

	const userRecord = await createAuthenticationUser({
		emailAddress,
		password,
		firstName,
		LastName: lastName
	});

	const userUID = userRecord.uid;

	try {
		await adminDB.collection(table).doc(userUID).set({
			firstName,
			lastName,
			emailAddress,
			shippingAddress,
			role: userRole
		});

		adminAuth.setCustomUserClaims(userUID, { role: "user" });
		// Change to admin when needed
		// adminAuth.setCustomUserClaims(userUID, { role: "admin" });

		return new Response();
	} catch (errorResponse: unknown) {
		console.log(errorResponse);
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);

	if (!decodedIdToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const tableSnapshot = await adminDB
		.collection(table)
		.where("emailAddress", "==", decodedIdToken.email)
		.get();

	const userData = tableSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	}));

	if (userData.length === 0) {
		throw error(404, {
			message: "user not found"
		});
	}

	const jsonString = JSON.stringify({ ...userData[0] });

	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request }) => {
	const { firstName, lastName, country, address1, address2, city, province, postalCode } =
		await request.json();
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);

		const id = decodedIdToken.uid;

		adminAuth.updateUser(id, {
			displayName: `${firstName} ${lastName}`
		});

		await adminDB.collection(table).doc(id).update({
			firstName,
			lastName,
			shippingAddress: {
				country,
				address1,
				address2,
				city,
				province,
				postalCode
			}
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
