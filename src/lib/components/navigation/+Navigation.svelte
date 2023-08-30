<script lang="ts">
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { productsRoute } from "$lib/constants/routes/productRoute";
	import NavigationCartButton from "$lib/components/navigation/+NavigationCartButton.svelte";
	import NavigationAccountButton from "$lib/components/navigation/+NavigationAccountButton.svelte";
	import { page } from "$app/stores";

	let scrollYPosition: number;
	let navigationFixed: boolean = false;

	$: {
		console.log($page);
		if (scrollYPosition > 40) {
			navigationFixed = true;
		} else {
			navigationFixed = false;
		}
	}
</script>

<svelte:window bind:scrollY={scrollYPosition} />

<header class={navigationFixed ? "fixed" : "block"}>
	<div class="--inner">
		<h2>WIEN</h2>

		<div class="--links">
			<a class={$page.url.pathname === homeRoute.path ? "--active" : ""} href={homeRoute.path}>
				{homeRoute.label}
			</a>
			<a
				class={$page.url.pathname.includes(productsRoute.path) ? "--active" : ""}
				href={`${productsRoute.path}/all`}
			>
				{productsRoute.label}
			</a>
		</div>

		<div class="--links">
			<NavigationCartButton />

			<NavigationAccountButton />
		</div>
	</div>
</header>

<style lang="scss">
	header {
		/* SIZE */
		@apply w-full h-20;
		/* MARGINS AND PADDING */
		@apply px-4;
		/* LAYOUT */
		@apply top-0 left-0;
		/* BORDERS */
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply drop-shadow;

		.--inner {
			/* SIZE */
			@apply max-w-[1170px] h-full;
			/* MARGINS AND PADDING */
			@apply mx-auto;
			/* LAYOUT */
			@apply flex items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--links {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-6;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--active {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply font-bold;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
