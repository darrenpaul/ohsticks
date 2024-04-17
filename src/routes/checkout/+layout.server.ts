/** @type {import('./$types').PageLoad} */
export async function load({ locals: { safeGetSession } }) {
	return {
		session: await safeGetSession()
	};
}
