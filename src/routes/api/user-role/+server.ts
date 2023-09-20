export const POST = async () => {
	const payload = { role: "admin" };
	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
