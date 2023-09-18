import { ORDER_SALT_KEY } from "$env/static/private";
import { getUnixTime } from "date-fns";
import crypto from "crypto";

export default async (email: string) => {
	const timestamp = getUnixTime(new Date());

	const stringToHash = `${email}&${timestamp}&${ORDER_SALT_KEY}`;

	const hash = crypto.createHash("md5").update(stringToHash).digest("hex");

	return hash;
};
