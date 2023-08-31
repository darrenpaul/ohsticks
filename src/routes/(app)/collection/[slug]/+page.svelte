<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import BreadCrumb from "$lib/components/+BreadCrumb.svelte";
	import ProductFeature from "$lib/components/product/+ProductFeature.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { Product } from "$lib/types/product";
	import ProductTabs from "$lib/components/product/+ProductTabs.svelte";
	import Carousel from "svelte-carousel";
	import { browser } from "$app/environment";
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import ProductList from "$lib/components/shared/+ProductList.svelte";
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

<div class="product-list">
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
	.product-list {
		/* SIZE */
		@apply w-fit max-w-[1495px];
		/* MARGINS AND PADDING */
		@apply mx-auto;
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
			@apply grid grid-cols-5 gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
