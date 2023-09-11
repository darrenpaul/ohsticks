<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import FeatureCarousel from "$lib/components/shared/+FeatureCarousel.svelte";
	import ProductList from "$lib/components/shared/+ProductList.svelte";
	import SideBySideImage from "$lib/components/shared/+SideBySideImage.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { Product } from "$lib/types/product.js";
	import { page } from "$app/stores";

	export let data;

	let products: Product[] = data.products;
	let pageData = data.pageData.find((page) => page.slug === "home");

	let pageUrl = "";

	$: {
		pageUrl = `${$page.url}`;
	}
</script>

<div class="home-page">
	<ContainWidth background="bg-transparent">
		<FeatureCarousel />

		<ProductList title={$trans("page.home.featuredProducts")} products={products.slice(0, 4)} />

		<SideBySideImage />
	</ContainWidth>
</div>

<style lang="scss">
	.home-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply grid items-center justify-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
