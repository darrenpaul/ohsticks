<script lang="ts">
	import type { Product } from "$lib/types/product";
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { page } from "$app/stores";
	import capitalizeWords from "$lib/utils/capitalizeWords";

	export let data;
	let products: Product[];

	$: {
		if (data.body.products) {
			products = data.body.products;
		}
	}
</script>

<div class="collection-page">
	<h2 class="--heading">
		{capitalizeWords($page.params.slug)}
	</h2>

	<div class="--list">
		{#each products as product}
			<ProductListCard {product} />
		{/each}
	</div>
</div>

<style lang="scss">
	.collection-page {
		/* SIZE */
		@apply w-fit max-w-[1495px];
		/* MARGINS AND PADDING */
		@apply mx-auto pt-1;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--heading {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply my-16;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-3xl text-center font-bold;
			/* ANIMATION AND EFFECTS */
		}

		.--list {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply px-4 mb-16;
			/* LAYOUT */
			@apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
