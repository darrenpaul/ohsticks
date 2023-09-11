<script lang="ts">
	import BreadCrumb from "$lib/components/+BreadCrumb.svelte";
	import ProductFeature from "$lib/components/product/+ProductFeature.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { Product } from "$lib/types/product";
	import type { Link } from "$lib/types/link";
	import ProductTabs from "$lib/components/product/+ProductTabs.svelte";
	import { browser } from "$app/environment";
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { _ as trans } from "svelte-i18n";
	import { page } from "$app/stores";
	import capitalizeWords from "$lib/utils/capitalizeWords";
	import { normalizeSlugString } from "$lib/utils/slugString";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import ProductSeo from "$lib/components/product/+ProductSEO.svelte";
	import { onMount } from "svelte";
	import Carousel from "svelte-carousel";

	let MobileOnlyComponent;
	let DesktopOnlyComponent;

	onMount(async () => {
		MobileOnlyComponent = (await import("$lib/components/shared/+MobileOnly.svelte")).default;
		DesktopOnlyComponent = (await import("$lib/components/shared/+DesktopOnly.svelte")).default;
	});

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
				<svelte:component this={MobileOnlyComponent}>
					<Carousel
						particlesToShow={1}
						particlesToScroll={1}
						arrows={false}
						autoplay
						autoplayDuration={3000}
						pauseOnFocus
					>
						{#each relatedProducts as product}
							<ProductListCard {product} />
						{/each}
					</Carousel>
				</svelte:component>

				<svelte:component this={DesktopOnlyComponent}>
					<Carousel
						particlesToShow={3}
						particlesToScroll={2}
						arrows={false}
						autoplay
						autoplayDuration={3000}
						pauseOnFocus
					>
						{#each relatedProducts as product}
							<ProductListCard {product} />
						{/each}
					</Carousel>
				</svelte:component>
			{/if}
		</div>
	</ContainWidth>
</div>

<ProductSeo {product} />>

<style lang="scss">
	.product-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mt-20;
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
