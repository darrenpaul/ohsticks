<script lang="ts">
	import type { Product } from "$lib/types/product";
	import { collectionRoute } from "$lib/constants/routes/collectionRoute";
	import { trans } from "$lib/locales/translateCopy";

	export let product: Product;
</script>

<div class="product-feature-categories">
	<p class="--title">
		{trans("component.productFeature.categories.label")}
	</p>

	<div class="--categories">
		{#each product.categories as category, index}
			{#if index < product.categories.length - 1}
				<a class="capitalize" href={`${collectionRoute.path}/${category}`}>{category}</a>
			{:else}
				<a class="capitalize" href={`${collectionRoute.path}/${category}`}>{category}</a>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.product-feature-categories {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex flex-col gap-1;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--categories {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-wrap gap-2;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--title {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mr-2;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply font-bold;
			/* ANIMATION AND EFFECTS */
		}

		a {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply px-3;
			/* LAYOUT */
			/* BORDERS */
			@apply border border-black rounded-full;
			/* COLORS */
			/* TEXT */
			@apply text-gray-500;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
