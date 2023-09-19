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
	const { userId, firstName, lastName } = await request.json();

	const { data, error } = await supabase.from("account").insert({
		first_name: firstName,
		last_name: lastName,
		user_id: userId
	});

	return new Response();
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals: { supabase, getSession } }) => {
	const { firstName, lastName, country, address1, address2, city, province, postalCode } =
		await request.json();

	const session = await getSession();

	const { data: existingShippingData } = await supabase
		.from("shipping_address")
		.select()
		.eq("user_id", session?.user.id)
		.select()
		.single();

	if (existingShippingData) {
		await supabase
			.from("shipping_address")
			.update({
				address_1: address1,
				address_2: address2 || "",
				city: city,
				province: province,
				postal_code: postalCode,
				country: country,
				user_id: session?.user.id
			})
			.eq("user_id", session?.user.id)
			.select()
			.single();
		return new Response();
	}

	const { data: shippingAddressData } = await supabase
		.from("shipping_address")
		.insert({
			address_1: address1,
			address_2: address2 || "",
			city: city,
			province: province,
			postal_code: postalCode,
			country: country,
			user_id: session?.user.id
		})
		.eq("user_id", session?.user.id)
		.select()
		.single();

	await supabase
		.from("account")
		.update({
			first_name: firstName,
			last_name: lastName,
			shipping_address: shippingAddressData?.id
		})
		.eq("user_id", session?.user.id)
		.select()
		.single();

	return new Response();
};
