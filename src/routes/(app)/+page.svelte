<script lang="ts">
	import Feature from "$lib/components/shared/+Feature.svelte";
	import ProductList from "$lib/components/shared/+ProductList.svelte";
	import SideBySideImage from "$lib/components/shared/+SideBySideImage.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { Product } from "$lib/types/product.js";
	import { page } from "$app/stores";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import { brandName, companyLogo, siteUrl } from "$lib/constants/site";
	import { collectionAllRoute, collectionRoute } from "$lib/constants/routes/collectionRoute.js";
	import { trans } from "$lib/locales/translateCopy";
	import GeneralInformation from "$lib/components/shared/+GeneralInformation.svelte";

	export /** @type {import('./$types').PageData} */
	let data;

	let products: Product[] = data.products;
	let pageData = data.pageData.find((page) => page.slug === "home");

	let pageUrl = "";

	$: {
		pageUrl = `${$page.url}`;
	}

	type QueryAction = SearchAction & {
		"query-input": string;
	};

	export const EXPLORE_ACTION: QueryAction = {
		"@id": `${siteUrl}/${collectionAllRoute.path}`,
		"@type": "SearchAction",
		target: `${siteUrl}/${collectionRoute.path}/{search_term_string}`,
		query: "required",
		"query-input": "required name=search_term_string"
	};
</script>

<div class="home-page">
	<Feature />

	<ContainWidth background="bg-transparent">
		<div class="--component-wrapper">
			<ProductList title={trans("page.home.featuredProducts")} products={products.slice(0, 4)} />
		</div>

		<div class="--component-wrapper">
			<GeneralInformation />
		</div>

		<SideBySideImage />
	</ContainWidth>
</div>

<MetaTags
	title={pageData.meta?.title}
	titleTemplate={pageData.meta?.title}
	description={pageData.meta?.description}
	canonical={pageUrl}
	openGraph={{
		...pageData.meta.openGraph,
		url: pageUrl
	}}
	twitter={{
		...pageData.meta.twitter,
		site: pageUrl
	}}
/>

<JsonLd
	schema={[
		{
			"@type": "WebSite",
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": siteUrl
			},
			name: brandName,
			url: siteUrl,
			potentialAction: EXPLORE_ACTION
		},
		{
			"@type": "LocalBusiness",
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": siteUrl
			},
			name: brandName,
			url: siteUrl,
			logo: companyLogo,
			description: "Business description",
			image: pageData.meta.openGraph.images.map((image) => image.src)
		}
	]}
/>

<style lang="scss">
	.home-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--component-wrapper {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-24;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
