<script lang="ts">
	import BreadCrumb from "$lib/components/+BreadCrumb.svelte";
	import ProductFeature from "$lib/components/product/+ProductFeature.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { Product } from "$lib/types/product";
	import type { Link } from "$lib/types/link";
	import ProductTabs from "$lib/components/product/+ProductTabs.svelte";
	import { browser } from "$app/environment";
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import { page } from "$app/stores";
	import capitalizeWords from "$lib/utils/capitalizeWords";
	import { normalizeSlugString } from "$lib/utils/slugString";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import ProductSeo from "$lib/components/product/+ProductSEO.svelte";
	import { viewItemEvent } from "$lib/utils/googleTagManager.js";
	import MobileOnly from "$lib/components/shared/+MobileOnly.svelte";
	import DesktopOnly from "$lib/components/shared/+DesktopOnly.svelte";

	export let data;

	let product: Product;
	let relatedProducts: Product[];
	let session;

	let crumbs: Link[] = [
		homeRoute,
		collectionAllRoute,
		{
			label: capitalizeWords(normalizeSlugString($page.params.slug)),
			name: normalizeSlugString($page.params.slug),
			path: ""
		}
	];

	const track = () => {
		viewItemEvent(product);
	};

	$: {
		const slug = $page.params.slug;

		product = data.products.find((product: Product) => product.slug === slug);
		relatedProducts = data.products.filter((product: Product) => product.slug !== slug);
		session = data.session;
		if (browser) {
			track();
		}
	}
</script>

<div class="product-page">
	<ContainWidth>
		<BreadCrumb {crumbs} />

		<ProductFeature {product} {session} />
	</ContainWidth>

	<ContainWidth background="bg-transparent">
		<ProductTabs {product} />

		<div class="--carousel-wrapper">
			<h2 class="--heading">{trans("page.product.relatedProducts.label")}</h2>

			{#if browser}{/if}
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
