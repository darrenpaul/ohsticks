<script lang="ts">
	import type { Product } from "$lib/types/product";
	import ProductListCard from "$lib/components/shared/+ProductListCard.svelte";
	import { page } from "$app/stores";
	import capitalizeWords from "$lib/utils/capitalizeWords";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import { productRoute } from "$lib/constants/routes/productRoute";
	import { siteUrl } from "$lib/constants/site.js";
	import { viewItemListEvent } from "$lib/utils/googleTagManager.js";
	import { browser } from "$app/environment";

	export let data;

	let products: Product[] = [];
	let pageData = data.pageData;
	let pageUrl = "";

	$: {
		if (browser) {
			products = productsByCategory($page.params.slug);
			track();
			pageUrl = `${$page.url}`;
		}
	}

	const productsByCategory = (category: string) => {
		if (category === "all") return data.products;
		return data.products.filter((product: Product) => product.categories.includes(category));
	};

	const track = () => {
		viewItemListEvent(products);
	};
</script>

<div class="collection-page">
	<h2 class="--heading">
		{capitalizeWords($page.params.slug)}
	</h2>

	<div class="--list">
		{#each products as product, index}
			<ProductListCard {product} {index} />
		{/each}
	</div>
</div>

<MetaTags
	title={pageData.title}
	titleTemplate={pageData.title}
	description={pageData.description}
	canonical={pageUrl}
	openGraph={{
		...pageData.openGraph,
		url: pageUrl
	}}
	twitter={{
		...pageData.twitter,
		site: pageUrl
	}}
/>

<JsonLd
	schema={[
		{
			"@type": "BreadcrumbList",
			itemListElement: products.map((product, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: product.name,
				item: `${siteUrl}${productRoute.path}/${product.slug}`
			}))
		},
		{
			"@type": "ItemList",
			itemListElement: products.map((product, index) => ({
				"@type": "ListItem",
				position: index + 1,
				url: `${siteUrl}${productRoute.path}/${product.slug}`
			}))
		}
	]}
/>

<style lang="postcss">
	.collection-page {
		/* SIZE */
		@apply w-fit max-w-[1495px];
		/* MARGINS AND PADDING */
		@apply mx-auto pt-1 px-0 sm:px-4 mt-20;
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
			@apply px-4 mb-16;
			/* LAYOUT */
			@apply flex flex-wrap justify-center gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
