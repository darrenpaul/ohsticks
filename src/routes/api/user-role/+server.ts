import { adminAuth } from "$lib/server/firebaseAdminClient";

export const POST = async ({ request }) => {
	const { accessToken } = await request.json();

	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);

	const payload = { role: decodedIdToken.role };
	const jsonString = JSON.stringify(payload);
	return new Response(jsonString, {
		headers: {
			"Content-Type": "application/json"
		}
	});
};
