import { accountRoute, loginRoute } from "$lib/constants/routes/accountRoute";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, `${loginRoute.path}?page=${accountRoute.name}`);
	}

	const { data } = await supabase
		.from("account")
		.select(
			`first_name, last_name, shipping_address( address_1, address_2, city, country, postal_code, province )`
		)
		.eq("user_id", session.user.id)
		.single();

	const account = {
		firstName: data.first_name,
		lastName: data.last_name,
		shippingAddress: {
			address1: data.shipping_address?.address_1 || "",
			address2: data.shipping_address?.address_2 || "",
			city: data.shipping_address?.city || "",
			country: data.shipping_address?.country || "",
			postalCode: data.shipping_address?.postal_code || "",
			province: data.shipping_address?.province || ""
		}
	};

	return { session, account };
};

// export const actions = {
// 	update: async ({ request, locals: { supabase, getSession } }) => {
// 		const formData = await request.formData();
// 		const fullName = formData.get("fullName") as string;
// 		const username = formData.get("username") as string;
// 		const website = formData.get("website") as string;
// 		const avatarUrl = formData.get("avatarUrl") as string;

// 		const session = await getSession();

// 		const { error } = await supabase.from("profiles").upsert({
// 			id: session?.user.id,
// 			full_name: fullName,
// 			username,
// 			website,
// 			avatar_url: avatarUrl,
// 			updated_at: new Date()
// 		});

// 		if (error) {
// 			return fail(500, {
// 				fullName,
// 				username,
// 				website,
// 				avatarUrl
// 			});
// 		}

// 		return {
// 			fullName,
// 			username,
// 			website,
// 			avatarUrl
// 		};
// 	},
// 	signout: async ({ locals: { supabase, getSession } }) => {
// 		const session = await getSession();
// 		if (session) {
// 			await supabase.auth.signOut();
// 			throw redirect(303, "/");
// 		}
// 	}
// };
