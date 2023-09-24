<script lang="ts">
	import { adminProductRoute } from "$lib/constants/routes/adminProductRoute";
	import { adminOrderRoute } from "$lib/constants/routes/adminOrderRoute";
	import { adminPageRoute } from "$lib/constants/routes/adminPageRoute";
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";
	import { loginRoute } from "$lib/constants/routes/accountRoute";
	import { goto } from "$app/navigation";
	import { adminRoute } from "$lib/constants/routes/adminRoute";
	import { adminSaleRoute } from "$lib/constants/routes/adminSaleRoute";

	const supabaseState: Writable<any> = getContext("supabaseState");

	const handleLogout = async () => {
		await $supabaseState.auth.signOut();
		goto(loginRoute.path, { replaceState: true });
	};
</script>

<nav>
	<div class="--links">
		<a href={adminRoute.path}>{adminRoute.label}</a>
		<a href={adminProductRoute.path}>{adminProductRoute.label}</a>
		<a href={adminSaleRoute.path}>{adminSaleRoute.label}</a>
		<a href={adminOrderRoute.path}>{adminOrderRoute.label}</a>
		<a href={adminPageRoute.path}>{adminPageRoute.label}</a>
	</div>

	<button on:click={handleLogout}>Logout</button>
</nav>

<style lang="scss">
	nav {
		/* SIZE */
		@apply h-12;
		/* MARGINS AND PADDING */
		@apply px-4;
		/* LAYOUT */
		@apply flex items-center justify-between;
		/* BORDERS */
		/* COLORS */
		@apply bg-slate-400;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--links {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-6;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
