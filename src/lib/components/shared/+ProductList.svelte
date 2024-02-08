<script lang="ts">
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import type { Product } from "$lib/types/product";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import Carousel from "svelte-carousel";
	import { browser } from "$app/environment";

	export let title: string;
	export let products: Product[];
</script>

<div class="product-list">
	<h2 class="--heading">{title}</h2>

	{#if browser}
		<Carousel
			particlesToShow={3}
			particlesToScroll={1}
			arrows={false}
			autoplay
			autoplayDuration={3000}
			pauseOnFocus
		>
			{#each products as product, index}
				<ProductListCard {product} {index} />
			{/each}
		</Carousel>
	{/if}

	<div class="--button-wrapper">
		<a
			class="submit-button"
			href={collectionAllRoute.path}
			aria-label={`Go to ${collectionAllRoute.label} page`}
		>
			{trans("component.productList.collection")}
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
