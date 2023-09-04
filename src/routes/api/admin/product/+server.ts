import { adminAuth, adminDB } from "$lib/server/firebaseAdminClient";
import { error, type HttpError } from "@sveltejs/kit";
import { adminRole } from "$lib/constants/roles";

const table = "product";

const verifyAdmin = async (accessToken: string | null) => {
	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
		if (decodedIdToken.role !== adminRole) {
			throw error(401, {
				message: "unauthorized"
			});
		}
	} catch (errorResponse) {
		throw error(401, {
			message: "unauthorized"
		});
	}
};

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const accessToken = request.headers.get("x-access-token");

	const {
		name,
		slug,
		categories,
		description,
		contentSections,
		purchasePrice,
		markupPercentage,
		price,
		quantity,
		visible,
		featureImage,
		images,
		meta
	} = await request.json();

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
		if (decodedIdToken.role !== adminRole) {
			throw error(401, {
				message: "unauthorized"
			});
		}
	} catch (errorResponse) {
		const knownError = errorResponse as HttpError;
		throw error(knownError.status, {
			message: knownError.body.message
		});
	}

	await adminDB.collection(table).doc().set({
		name,
		slug,
		categories,
		description,
		contentSections,
		purchasePrice,
		markupPercentage,
		price,
		quantity,
		visible,
		featureImage,
		images,
		meta
	});

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};

// LIST
/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, request }) => {
	const accessToken = request.headers.get("x-access-token");

	if (!accessToken) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	try {
		const decodedIdToken = await adminAuth.verifyIdToken(accessToken);
		if (decodedIdToken.role !== adminRole) {
			throw error(401, {
				message: "unauthorized"
			});
		}
	} catch (errorResponse) {
		throw error(401, {
			message: "unauthorized"
		});
	}

	const slug = url.searchParams.get("slug");

	const tableSnapshot = slug
		? await adminDB.collection(table).where("slug", "==", slug).get()
		: await adminDB.collection(table).get();
	const products = tableSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	return new Response(JSON.stringify(products), {
		headers: {
			"Content-Type": "application/json"
		}
	});
};

// UPDATE
/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request }) => {
	const { id, name, description, price, quantity, visible, featureImage, images } =
		await request.json();

	await adminDB.collection(table).doc(id).update({
		name,
		description,
		price,
		quantity,
		visible,
		featureImage,
		images
	});

	return new Response(
		String({
			status: 200
		})
	);
};

// DELETE
/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
	const { id } = await request.json();

	await adminDB.collection(table).doc(id).delete();

	return new Response(
		String({
			status: 200
		})
	);
};
