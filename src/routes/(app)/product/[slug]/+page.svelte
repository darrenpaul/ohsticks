<script lang="ts">
	import BreadCrumb from "$lib/components/+BreadCrumb.svelte";
	import ProductFeature from "$lib/components/product/+ProductFeature.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { Product } from "$lib/types/product";
	import type { Link } from "$lib/types/link";
	import ProductTabs from "$lib/components/product/+ProductTabs.svelte";
	import Carousel from "svelte-carousel";
	import { browser } from "$app/environment";
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { _ as trans } from "svelte-i18n";
	import { page } from "$app/stores";
	import capitalizeWords from "$lib/utils/capitalizeWords";
	import { normalizeSlugString } from "$lib/utils/slugString";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import { MetaTags, JsonLd } from "svelte-meta-tags";
	import MobileOnly from "$lib/components/shared/+MobileOnly.svelte";
	import DesktopOnly from "$lib/components/shared/+DesktopOnly.svelte";
	import ProductSeo from "$lib/components/product/+ProductSEO.svelte";

	let carousel; // for calling methods of the carousel instance

	let crumbs: Link[] = [
		homeRoute,
		collectionAllRoute,
		{
			label: capitalizeWords(normalizeSlugString($page.params.slug)),
			name: normalizeSlugString($page.params.slug),
			path: ""
		}
	];

	export let data;
	let product: Product;
	let relatedProducts: Product[];

	$: {
		if (data.body.product) {
			product = data.body.product;
			relatedProducts = data.body.relatedProducts as Product[];

			console.log("product:", product);
		}
	}
</script>

<div class="product-page">
	<ContainWidth>
		<BreadCrumb {crumbs} />

		<ProductFeature {product} />
	</ContainWidth>

	<ContainWidth background="bg-transparent">
		<ProductTabs {product} />

		<div class="--carousel-wrapper">
			<h2 class="--heading">{$trans("page.product.relatedProducts.label")}</h2>

			{#if browser}
				<MobileOnly>
					<Carousel particlesToShow={1} particlesToScroll={1} arrows={false}>
						{#each relatedProducts as product}
							<ProductListCard {product} />
						{/each}
					</Carousel>
				</MobileOnly>

				<DesktopOnly>
					<Carousel particlesToShow={3} particlesToScroll={2} arrows={false}>
						{#each relatedProducts as product}
							<ProductListCard {product} />
						{/each}
					</Carousel>
				</DesktopOnly>
			{/if}
		</div>
	</ContainWidth>
</div>

<ProductSeo {product} />>

<style lang="scss">
	.product-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--carousel-wrapper {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-16;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--heading {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply mb-8;
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply text-center font-bold;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
