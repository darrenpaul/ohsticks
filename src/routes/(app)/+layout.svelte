<script lang="ts">
	import "$lib/i18n"; // Import to initialize. Important :)
	import { browser } from "$app/environment";
	import Navigation from "$lib/components/navigation/+Navigation.svelte";
	import Footer from "$lib/components/footer/+Footer.svelte";
	import { isLoading } from "svelte-i18n";
	import CartMenu from "$lib/components/cart/+CartMenu.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	import { brandName, companyLogo, siteUrl } from "$lib/constants/site";
	import { collectionAllRoute, collectionRoute } from "$lib/constants/routes/collectionRoute";
	import { page } from "$app/stores";

	const cartState = writable(false);

	let pageData = $page.data.pageData.find((page) => page.slug === "home");

	if (browser) {
		setContext("cartState", cartState);
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

{#if $isLoading}
	Please wait...
{:else}
	<Navigation />

	<div class="page">
		<slot />
	</div>

	{#if $cartState}
		<CartMenu />
	{/if}

	<Footer />
{/if}

<svelte:head>
	<title>{pageData.meta?.title}</title>
</svelte:head>

<!-- <MetaTags
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
/> -->

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
	.page {
		/* SIZE */
		@apply min-h-[100dvh];
		/* MARGINS AND PADDING */
		@apply mx-auto mt-20;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
