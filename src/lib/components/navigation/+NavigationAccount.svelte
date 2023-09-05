<script lang="ts">
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import { page } from "$app/stores";
	import { contactRoute } from "$lib/constants/routes/contactRoute";
	import { logoutUser } from "$lib/firebase/firebaseClient";
	import { accountRoute } from "$lib/constants/routes/accountRoute";

	let links = [homeRoute, accountRoute, collectionAllRoute, contactRoute];
</script>

<nav>
	<div class="--links">
		{#each links as link}
			<a class={$page.url.pathname === link.path ? "--active" : ""} href={link.path}>
				{link.label}
			</a>
		{/each}
	</div>

	<button on:click={logoutUser}>Logout</button>
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
