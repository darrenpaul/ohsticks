<script lang="ts">
	import {
		dashboardAccountOrdersRoute,
		dashboardAccountRoute
	} from "$lib/constants/routes/dashboardRoute";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import { clearCart } from "$lib/stores/cartStore";
	import { goto } from "$app/navigation";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { trans } from "$lib/locales/translateCopy";

	const supabaseState: Writable<any> = getContext("supabaseState");

	const handleLogout = async () => {
		await clearCart();
		await $supabaseState.auth.signOut();
		goto(homeRoute.path, { replaceState: true });
	};
</script>

<div class="navigation-account-dropdown-menu">
	<!-- ORDERS -->
	<a class="--dropdown-button" href={dashboardAccountOrdersRoute.path}>
		{dashboardAccountOrdersRoute.label}
	</a>

	<!-- ACCOUNT -->
	<a class="--dropdown-button" href={dashboardAccountRoute.path}>
		{dashboardAccountRoute.label}
	</a>

	<button
		class="--dropdown-button"
		on:click={handleLogout}
		aria-label={trans("component.navigation.logout.aria")}
	>
		{trans("component.navigation.logout.label")}
	</button>
</div>

<style lang="postcss">
	.navigation-account-dropdown-menu {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply py-2;
		/* LAYOUT */
		@apply absolute right-0 top-0 translate-y-14;
		/* BORDERS */
		@apply rounded-2xl;
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--dropdown-button {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply px-4 py-1;
			/* LAYOUT */
			@apply block;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
