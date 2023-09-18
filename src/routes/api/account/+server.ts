import { error, type HttpError } from "@sveltejs/kit";
// import { userRole } from "$lib/constants/roles";
// import type { FirebaseError } from "firebase-admin";

const table = "user";

// const createAuthenticationUser = async ({
// 	emailAddress,
// 	phoneNumber,
// 	password,
// 	firstName,
// 	LastName
// }) => {
// 	try {
// 		return await adminAuth.createUser({
// 			email: emailAddress,
// 			emailVerified: false,
// 			phoneNumber: phoneNumber,
// 			password: password,
// 			displayName: `${firstName} ${LastName}`,
// 			photoURL: "http://www.example.com/12345678/photo.png",
// 			disabled: false
// 		});
// 	} catch (errorResponse: unknown) {
// 		const knownError = errorResponse as FirebaseError;

// 		const errorCode = knownError.code === "auth/email-already-exists" ? 409 : 500;
// 		throw error(errorCode, {
// 			message: knownError.message
// 		});
// 	}
// };

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { supabase } }) => {
	const { uuid, firstName, lastName, emailAddress, shippingAddress } = await request.json();

	const { data: shippingAddressData, error: shippingAddressError } = await supabase
		.from("shipping_address")
		.insert({
			uuid,
			address_1: shippingAddress?.address1 || "",
			address_2: shippingAddress?.address2 || "",
			city: shippingAddress?.city || "",
			country: shippingAddress?.country || "",
			postal_code: shippingAddress?.postalCode || "",
			province: shippingAddress?.province || ""
		})
		.select()
		.single();

	const { data: accountData, error: accountError } = await supabase.from("account").insert({
		first_name: firstName,
		last_name: lastName,
		email_address: emailAddress,
		shipping_address: shippingAddressData.id
	});
	console.log("POST ~ accountError:", accountError);
	console.log("POST ~ accountData:", accountData);

	return new Response();
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request }) => {
	// const accessToken = request.headers.get("x-access-token");
	// if (!accessToken) {
	// 	throw error(401, {
	// 		message: "unauthorized"
	// 	});
	// }
	// const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	// if (!decodedIdToken) {
	// 	throw error(401, {
	// 		message: "unauthorized"
	// 	});
	// }
	// const tableSnapshot = await adminDB
	// 	.collection(table)
	// 	.where("emailAddress", "==", decodedIdToken.email)
	// 	.get();
	// const userData = tableSnapshot.docs.map((doc) => ({
	// 	id: doc.id,
	// 	...doc.data()
	// }));
	// if (userData.length === 0) {
	// 	throw error(404, {
	// 		message: "user not found"
	// 	});
	// }
	// const jsonString = JSON.stringify({ ...userData[0] });
	// return new Response(jsonString, {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request }) => {
	// const { firstName, lastName, country, address1, address2, city, province, postalCode } =
	// 	await request.json();
	// const accessToken = request.headers.get("x-access-token");
	// if (!accessToken) {
	// 	throw error(401, {
	// 		message: "unauthorized"
	// 	});
	// }
	// try {
	// 	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	// 	const id = decodedIdToken.uid;
	// 	adminAuth.updateUser(id, {
	// 		displayName: `${firstName} ${lastName}`
	// 	});
	// 	await adminDB.collection(table).doc(id).update({
	// 		firstName,
	// 		lastName,
	// 		shippingAddress: {
	// 			country,
	// 			address1,
	// 			address2,
	// 			city,
	// 			province,
	// 			postalCode
	// 		}
	// 	});
	// 	return new Response(
	// 		String({
	// 			status: 200
	// 		})
	// 	);
	// } catch (errorResponse) {
	// 	const knownError = errorResponse as HttpError;
	// 	throw error(knownError.status, {
	// 		message: knownError.body.message
	// 	});
	// }
};

// DELETE
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
	// const accessToken = request.headers.get("x-access-token");
	// if (!accessToken) {
	// 	throw error(401, {
	// 		message: "unauthorized"
	// 	});
	// }
	// try {
	// 	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	// 	const uid = decodedIdToken.uid;
	// 	await adminAuth.deleteUser(uid);
	// 	await adminDB.collection(table).doc(uid).delete();
	// 	return new Response(
	// 		String({
	// 			status: 200
	// 		})
	// 	);
	// } catch (errorResponse) {
	// 	const knownError = errorResponse as HttpError;
	// 	throw error(knownError.status, {
	// 		message: knownError.body.message
	// 	});
	// }
};
