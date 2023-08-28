<script lang="ts">
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { productsRoute } from "$lib/constants/routes/productRoute";
	import NavigationCartButton from "$lib/components/navigation/+NavigationCartButton.svelte";
	import NavigationAccountButton from "$lib/components/navigation/+NavigationAccountButton.svelte";
</script>

<header>
	<div class="--links">
		<a href={homeRoute.path}>{homeRoute.label}</a>

		<a href={`${productsRoute.path}/all`}>{productsRoute.label}</a>

		<NavigationAccountButton />

		<NavigationCartButton />
	</div>
</header>

<style lang="scss">
	header {
		/* SIZE */
		@apply h-20;
		/* MARGINS AND PADDING */
		@apply px-4;
		/* LAYOUT */
		@apply flex items-center justify-center;
		/* BORDERS */
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply drop-shadow;

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
