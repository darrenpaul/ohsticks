import { getRegionCurrency } from "$lib/server/region.js";

/** @type {import('./$types').PageLoad} */
export async function load({ locals: { getSession } }) {
	return {
		session: await getSession()
	};
}
