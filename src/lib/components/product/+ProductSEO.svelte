<script lang="ts">
	import type { Product } from "$lib/types/product";
	import { page } from "$app/stores";
	import { MetaTags, JsonLd } from "svelte-meta-tags";
	import { _ as trans } from "svelte-i18n";

	export let product: Product;

	let pageUrl = "";
	let openGraphImages = product.meta.openGraph?.images.map((image) => ({
		url: image.src,
		alt: product.name,
		width: image.width,
		height: image.height
	}));
	let jsonLdImages = [product.featureImage, ...product.images].map((image) => image.src);

	$: {
		pageUrl = `${$page.url}`;
	}
</script>

<MetaTags
	title={product.meta?.title}
	titleTemplate={product.meta?.title}
	description={product.meta?.description}
	canonical={pageUrl}
	openGraph={{
		title: product.meta?.title,
		description: product.meta?.description,
		url: pageUrl,
		type: "website",
		images: openGraphImages
	}}
	twitter={{
		handle: "",
		site: pageUrl,
		cardType: "summary_large_image",
		title: product.meta?.title,
		description: product.meta?.description,
		image: product.meta.twitter?.image,
		imageAlt: product.name
	}}
/>

<JsonLd
	schema={{
		"@type": "Product",
		name: product.name,
		image: jsonLdImages,
		description: product.description,
		sku: product.id,
		brand: {
			"@type": "Brand",
			name: $trans("site.brandName")
		},
		review: [
			// {
			// 	"@type": "Review",
			// 	reviewRating: {
			// 		"@type": "Rating",
			// 		ratingValue: "4",
			// 		bestRating: "5"
			// 	},
			// 	author: {
			// 		"@type": "Person",
			// 		name: "Fred Benson"
			// 	}
			// }
		],
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "5",
			reviewCount: "0"
		},
		offers: {
			"@type": "Offer",
			url: pageUrl,
			priceCurrency: "EUR",
			price: product.price,
			priceValidUntil: "2024-12-31",
			itemCondition: "https://schema.org/NewCondition",
			availability: "https://schema.org/InStock"
		}
	}}
/>
