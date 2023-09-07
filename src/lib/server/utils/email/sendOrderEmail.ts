import nodemailer from "nodemailer";
import {
	PRIVATE_EMAIL_HOST,
	PRIVATE_EMAIL_USER,
	PRIVATE_EMAIL_PASSWORD
} from "$env/static/private";
import fs from "fs";
import Mustache from "mustache";

export default async function sendOrderEmail(order) {
	const emailTemplate = await fs.readFileSync(
		"src/lib/server/utils/email/templates/orderTemplate.html",
		{
			encoding: "utf-8"
		}
	);

	const view = {
		companyName: "OhSticks",
		firstName: "Joe",
		orderNumber: "123456789",
		shippingAddress: "1234 Main St, San Francisco, CA 94123",
		deliveryDate: "Monday, June 1st",
		orderUrl: "http://127.0.0.1:5173/account/order/K2ci87PQ2q3ygpWGR464"
	};

	// const htmlBody = await Mustache.render(emailTemplate, view);

	// const transporter = nodemailer.createTransport({
	// 	host: PRIVATE_EMAIL_HOST,
	// 	port: 465,
	// 	secure: true,
	// 	auth: {
	// 		user: PRIVATE_EMAIL_USER,
	// 		pass: PRIVATE_EMAIL_PASSWORD
	// 	}
	// });

	// const info = await transporter.sendMail({
	// 	from: '"Hello OhSticks 👻" <hello@ohsticks.com>', // sender address
	// 	to: "darrenpaul@duck.com", // list of receivers
	// 	subject: "🎉 Your Order is Locked & Loaded! Confirmation Inside 🚀", // Subject line
	// 	text: "We want you to know that your decision to shop with us has made our day, and we're here to make sure your shopping experience is nothing short of amazing. Your order details are below for your reference:", // plain text body
	// 	html: htmlBody // html body
	// });

	// transporter.sendMail(info);
}
