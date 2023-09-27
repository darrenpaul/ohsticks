import { loginRoute } from "$lib/constants/routes/accountRoute";
import { dashboardAccountRoute } from "$lib/constants/routes/dashboardRoute";
import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, `${loginRoute.path}?page=${dashboardAccountRoute.name}`);
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

	const response = await fetch("/api/order", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const orders = await response.json();

	return { session, account, orders };
};
