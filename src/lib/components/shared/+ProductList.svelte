<script lang="ts">
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { _ as trans } from "svelte-i18n";
	import type { Product } from "$lib/types/product";

	export let title = "Product List";
	export let products: Product[];
</script>

<div class="product-list">
	<h2 class="--heading">{title}</h2>

	<div class="--list">
		{#each products as product}
			<ProductListCard {product} />
		{/each}
	</div>

	<div class="--button-wrapper">
		<button>{$trans("component.productList.allProducts")}</button>
	</div>
</div>

<style lang="scss">
	.product-list {
		/* SIZE */
		@apply w-full;
		/* MARGINS AND PADDING */
		@apply px-2 mx-auto;
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
			@apply mb-16;
			/* LAYOUT */
			@apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--button-wrapper {
			/* SIZE */
			@apply w-full;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex items-center justify-center;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
			button {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply py-4 px-8;
				/* LAYOUT */
				/* BORDERS */
				@apply rounded-full;
				/* COLORS */
				@apply bg-black text-white;
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
