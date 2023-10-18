import randomString from "$lib/utils/randomString";
import { createHash } from "crypto";
import { getUnixTime } from "date-fns";

export const generateOrderId = (customerEmail: string) => {
	const orderIdString = `OhSticks-${customerEmail}-${getUnixTime(new Date())}-${randomString(10)}`;
	return createHash("md5").update(orderIdString).digest("hex");
};
