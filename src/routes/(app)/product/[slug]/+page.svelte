<script lang="ts">
	import BreadCrumb from "$lib/components/+BreadCrumb.svelte";
	import ProductFeature from "$lib/components/product/+ProductFeature.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { Product } from "$lib/types/product";
	import ProductTabs from "$lib/components/product/+ProductTabs.svelte";
	import Carousel from "svelte-carousel";
	import { browser } from "$app/environment";
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";

	let carousel; // for calling methods of the carousel instance

	const handleNextClick = () => {
		carousel.goToNext();
	};

	export let data;
	let product: Product;
	let relatedProducts: Product[];

	$: {
		if (data.body.product) {
			product = data.body.product;
			relatedProducts = data.body.relatedProducts;
		}
	}
</script>

<ContainWidth>
	<BreadCrumb />

	<ProductFeature {product} />
</ContainWidth>

<ContainWidth background="bg-transparent">
	<ProductTabs {product} />

	<h2>Related Products</h2>
	{#if browser}
		<Carousel particlesToShow={3} particlesToScroll={2} arrows={false}>
			{#each relatedProducts as product}
				<ProductListCard {product} />
			{/each}
		</Carousel>
	{/if}
</ContainWidth>
