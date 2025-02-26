<script lang="ts">
	import Feature from "$lib/components/shared/+Feature.svelte";
	import ProductList from "$lib/components/shared/+ProductList.svelte";
	import SideBySideImage from "$lib/components/shared/+SideBySideImage.svelte";
	import CollectionCard from "$lib/components/shared/+CollectionCard.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { Product } from "$lib/types/product";
	import { page } from "$app/stores";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import { brandName, companyLogo, siteUrl } from "$lib/constants/site";
	import { collectionAllRoute, collectionRoute } from "$lib/constants/routes/collectionRoute";
	import { trans } from "$lib/locales/translateCopy";
	import GeneralInformation from "$lib/components/shared/+GeneralInformation.svelte";

	export /** @type {import('./$types').PageData} */

	let data;

	let products: Product[] = data.products || [];
	let pageData = data.pageData;

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
		<div class="component-wrapper">
			<ProductList title={trans("page.home.featuredProducts")} products={products.slice(0, 4)} />
		</div>

		<div class="component-wrapper">
			<GeneralInformation />
		</div>

		<SideBySideImage title={trans("page.home.browserOurPopulateCategories.label")}>
			<CollectionCard
				image="https://pziocbmxbpurobqznrjs.supabase.co/storage/v1/object/public/page/home/ohsticks-sticker-bag.webp"
				url={`${collectionRoute.path}/cute`}
				ariaLabel={`Go to cute collection page`}
			>
				Cute
			</CollectionCard>

			<CollectionCard
				image="https://pziocbmxbpurobqznrjs.supabase.co/storage/v1/object/public/page/home/ohsticks-sticker-on-laptop.webp"
				url={`${collectionRoute.path}/monster`}
				ariaLabel={`Go to monster collection page`}
			>
				Monster
			</CollectionCard>

			<CollectionCard
				image="https://pziocbmxbpurobqznrjs.supabase.co/storage/v1/object/public/page/home/ohsticks-sticker-on-laptop.webp"
				url={`${collectionRoute.path}/cat`}
				ariaLabel={`Go to cat collection page`}
			>
				Cat
			</CollectionCard>
		</SideBySideImage>
	</ContainWidth>
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
			image: pageData.openGraph.images.map((image) => image.src)
		}
	]}
/>

<style lang="postcss">
	@import "./+page.scss";
</style>
