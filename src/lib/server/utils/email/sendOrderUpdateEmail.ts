import nodemailer from "nodemailer";
import {
	PRIVATE_EMAIL_HOST,
	PRIVATE_EMAIL_USER,
	PRIVATE_EMAIL_PASSWORD
} from "$env/static/private";
import fs from "fs";
import Mustache from "mustache";
import { brandName } from "$lib/constants/site";

export default async function sendOrderEmail(order) {
	const emailTemplate = await fs.readFileSync(
		"src/lib/server/utils/email/templates/orderUpdate.html",
		{
			encoding: "utf-8"
		}
	);

	const view = {
		companyName: brandName,
		firstName: order.customer.firstName,
		orderNumber: order.id,
		shippingAddress: order.shippingAddress.address1,
		deliveryDate: "Monday, Sept 25",
		orderStatus: order.status,
		orderUrl: `https://ohsticks.vercel.app/account/order/${order.id}`
	};

	const htmlBody = await Mustache.render(emailTemplate, view);

	const transporter = nodemailer.createTransport({
		host: PRIVATE_EMAIL_HOST,
		port: 465,
		secure: true,
		auth: {
			user: PRIVATE_EMAIL_USER,
			pass: PRIVATE_EMAIL_PASSWORD
		}
	});

	const info = await transporter.sendMail({
		from: '"Hello OhSticks 👻" <hello@ohsticks.com>', // sender address
		to: `darrenpaul@duck.com, ${order.customer.email}`, // list of receivers
		subject: "Order Update", // Subject line
		text: "We have updated the status of your order!",
		html: htmlBody // html body
	});

	transporter.sendMail(info);
}
