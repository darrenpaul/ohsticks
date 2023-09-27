import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import randomString from "$lib/utils/randomString";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { getUnixTime } from "date-fns";

// CREATE
/** @type {import('./$types').RequestHandler} */
export const POST = async () => {
	const apples = `OhSticks${getUnixTime(new Date())}${randomString(10)}`;
	const hash = createHash("md5").update(apples).digest("hex");
	console.log("POST ~ apples:", apples);
	console.log("POST ~ hash:", hash);
	return new Response();
};
