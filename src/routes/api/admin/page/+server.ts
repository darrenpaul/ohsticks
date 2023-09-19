// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async () => {
	// const accessToken = request.headers.get("x-access-token");

	// const { name, slug, meta } = await request.json();

	// if (!accessToken) {
	// 	throw error(401, {
	// 		message: "unauthorized"
	// 	});
	// }

	// try {
	// 	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	// 	if (decodedIdToken.role !== adminRole) {
	// 		throw error(401, {
	// 			message: "unauthorized"
	// 		});
	// 	}
	// } catch (errorResponse) {
	// 	const knownError = errorResponse as HttpError;
	// 	throw error(knownError.status, {
	// 		message: knownError.body.message
	// 	});
	// }

	// await adminDB.collection(table).doc().set({
	// 	name,
	// 	slug,
	// 	meta
	// });

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
	// TODO: PROTECT THIS ROUTE

	// const accessToken = request.headers.get("x-access-token");

	// if (!accessToken) {
	// 	throw error(401, {
	// 		message: "unauthorized"
	// 	});
	// }

	// try {
	// 	const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
	// 	if (decodedIdToken.role !== adminRole) {
	// 		throw error(401, {
	// 			message: "unauthorized"
	// 		});
	// 	}
	// } catch (errorResponse) {
	// 	throw error(401, {
	// 		message: "unauthorized"
	// 	});
	// }

	// const tableSnapshot = await adminDB.collection(table).get();
	// const products = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	// return new Response(JSON.stringify(products), {
	// 	headers: {
	// 		"Content-Type": "application/json"
	// 	}
	// });

	return new Response();
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async () => {
	// const { id, name, slug, meta } = await request.json();

	// await adminDB.collection(table).doc(id).update({
	// 	name,
	// 	slug,
	// 	meta
	// });

	return new Response(
		String({
			status: 200
		})
	);
};

// DELETE
/** @type {import('./$types').RequestHandler} */
export const DELETE = async () => {
	// const { id } = await request.json();

	// await adminDB.collection(table).doc(id).delete();

	return new Response(
		String({
			status: 200
		})
	);
};
