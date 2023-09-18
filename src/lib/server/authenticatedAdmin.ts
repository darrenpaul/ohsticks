import { adminRole } from "$lib/constants/roles";

export default async (getSession, supabase) => {
	const session = await getSession();

	// Check if the user is logged in
	if (!session) {
		return false;
	}

	const { data: userData } = await supabase
		.from("account")
		.select(`role ( * )`)
		.eq("id", session.user.id)
		.single();

	if (!userData || userData.role.value !== adminRole) {
		return false;
	}

	return session;
};
