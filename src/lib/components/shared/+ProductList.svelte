<script lang="ts">
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import type { Product } from "$lib/types/product";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";

	export let title: string = "Product List";
	export let products: Product[];
</script>

<div class="product-list">
	<h2 class="--heading">{title}</h2>

	<div class="--list">
		{#each products as product, index}
			<ProductListCard {product} {index} />
		{/each}
	</div>

	<div class="--button-wrapper">
		<a href={collectionAllRoute.path} aria-label={`Go to ${collectionAllRoute.label} page`}>
			<ButtonIcon>
				{trans("component.productList.collection")}
			</ButtonIcon>
		</a>
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
			// @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8;
			@apply flex flex-wrap justify-center gap-8;
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
		}
	}
</style>
