import nodemailer from "nodemailer";
import {
	PRIVATE_EMAIL_HOST,
	PRIVATE_EMAIL_USER,
	PRIVATE_EMAIL_PASSWORD
} from "$env/static/private";
import sendOrderEmail from "$lib/server/utils/email/sendOrderEmail.js";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	sendOrderEmail();

	return new Response(
		String({
			status: 200,
			body: "success"
		})
	);
};
