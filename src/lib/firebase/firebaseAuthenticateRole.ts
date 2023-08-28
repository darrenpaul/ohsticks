export default async (token: string) => {
	const roleResponse = await fetch("/api/user-role", {
		method: "POST",
		body: JSON.stringify({ accessToken: token })
	});

	return await roleResponse.json();
};
