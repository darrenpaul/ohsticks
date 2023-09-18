<script lang="ts">
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { page } from "$app/stores";
	import { accountOrdersRoute, accountRoute } from "$lib/constants/routes/accountRoute";

	let links = [homeRoute, accountRoute, accountOrdersRoute];
</script>

<nav>
	<div class="--links">
		{#each links as link}
			<a class={$page.url.pathname === link.path ? "--active" : ""} href={link.path}>
				{link.label}
			</a>
		{/each}
	</div>

	<button class="--logout-button" on:click={() => {}}>Logout</button>
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
		@apply bg-black;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply shadow;

		.--links {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-6;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-white
			/* ANIMATION AND EFFECTS */;
		}

		.--logout-button {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-white
			/* ANIMATION AND EFFECTS */;
		}
	}
</style>
