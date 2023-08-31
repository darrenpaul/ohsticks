<script lang="ts">
	import type { Product } from "$lib/types/product";
	import { collectionRoute } from "$lib/constants/routes/collectionRoute";
	import { _ as trans } from "svelte-i18n";

	export let product: Product;
</script>

<div class="product-feature-categories">
	<p class="--title">
		{$trans("component.productFeature.categories.label")}:
	</p>

	{#each product.categories as category, index}
		{#if index < product.categories.length - 1}
			<a href={`${collectionRoute.path}/${category}`}>{category}</a>
			<small>,</small>
		{:else}
			<a href={`${collectionRoute.path}/${category}`}>{category}</a>
		{/if}
	{/each}
</div>

<style lang="scss">
	.product-feature-categories {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex items-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

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
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-gray-500;
			/* ANIMATION AND EFFECTS */
		}

		small {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mr-1;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
