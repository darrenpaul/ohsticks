<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import ImageUploadInput from "$lib/components/inputs/+ImageUploadInput.svelte";
	import ProductCreateSeoForm from "$lib/components/admin/product/+ProductCreateSeoForm.svelte";
	import ProductCreateContentSections from "$lib/components/admin/product/+ProductCreateContentSections.svelte";
	import type { ContentSection, Image } from "$lib/types/product";
	import ProductCreateInformation from "$lib/components/admin/product/+ProductCreateInformation.svelte";
	import ProductCreatePrice from "$lib/components/admin/product/+ProductCreatePrice.svelte";
	import { brandName } from "$lib/constants/site";
	import { deleteImages } from "$lib/utils/imageProcessing.js";

	export let data;
	let supabase = data.supabase;

	let name: string;
	let slug = "";
	let brand = brandName;
	let categories = "";
	let description = "";
	let contentSections: ContentSection[] = [];
	let discountPercentage = 0;
	let currencyPrice = {};
	let quantity = 10;
	let visible = false;
	let featureImage: Image[] = [];
	let productImages: Image[] = [];

	let metaTitle = "";
	let metaDescription = "";
	let metaKeywords = "";
	let twitterImage: Image[] = [];
	let openGraphImages: Image[] = [];

	const handleFormSubmit = async () => {
		const response = await fetch("/api/admin/product", {
			method: "POST",
			body: JSON.stringify({
				name,
				slug,
				brand,
				categories: categories.split(",").map((category) => category.trim()),
				description,
				contentSections,
				currencyPrice,
				discountPercentage,
				quantity,
				visible,
				featureImage: featureImage[0] || "",
				images: productImages,
				meta: {
					title: metaTitle,
					description: metaDescription,
					keywords: metaKeywords,
					twitter: {
						card: "summary_large_image",
						site: "@site",
						title: metaTitle,
						description: metaDescription,
						image: twitterImage[0] || ""
					},
					openGraph: {
						title: metaTitle,
						description: metaDescription,
						type: "product",
						images: openGraphImages
					}
				}
			})
		});

		if (response.ok) {
			alert("Product created");
			return;
		}

		await deleteImages(name, supabase);
	};
</script>

<div class="product-page">
	<div class="--header">
		<h1>
			{trans("page.product.createProduct.label")}
		</h1>
	</div>

	<form class="--form" on:submit|preventDefault={handleFormSubmit}>
		<ProductCreateInformation bind:name bind:slug bind:brand bind:categories bind:description />

		<!-- CONTENT SECTIONS -->
		<ProductCreateContentSections bind:contentSections />

		<ProductCreatePrice bind:currencyPrice />

		<!-- DISCOUNT PERCENTAGE -->
		<div class="input-group">
			<label for="discountPercentage">
				{trans("form.createProduct.discountPercentage.label")}
				{discountPercentage}%
			</label>
			<input
				type="range"
				min="0"
				max="100"
				id="discountPercentage"
				bind:value={discountPercentage}
			/>
		</div>

		<!-- QUANTITY -->
		<div class="input-group">
			<input
				class="peer"
				id="quantity"
				name="quantity"
				type="text"
				bind:value={quantity}
				placeholder=""
			/>
			<label class="floating-label" for="quantity">
				{trans("form.createProduct.quantity.label")}
			</label>
		</div>

		<!-- VISIBLE -->
		<div class="checkbox-group">
			<input class="checkbox" type="checkbox" id="visible" name="visible" bind:checked={visible} />
			<label for="visible">{trans("form.createProduct.visible.label")}</label>
		</div>

		{#if name}
			<!-- FEATURE IMAGE -->
			<div class="input-group">
				<ImageUploadInput
					elementId="featureImage"
					label={trans("form.createProduct.featureImage.label")}
					{name}
					bind:images={featureImage}
				/>
				<small>512x512 (WEBP)</small>
			</div>

			<!-- IMAGES -->
			<div class="input-group">
				<ImageUploadInput
					elementId="productImages"
					label={trans("form.createProduct.productImages.label")}
					multiple={true}
					{name}
					bind:images={productImages}
				/>
				<small>512x512 (WEBP)</small>
			</div>

			<ProductCreateSeoForm
				{name}
				searchKeywords={name}
				bind:productDescription={description}
				bind:productContentSections={contentSections}
				bind:metaTitle
				bind:metaDescription
				bind:metaKeywords
				bind:twitterImage
				bind:openGraphImages
			/>
		{/if}

		<button>Create</button>
	</form>
</div>

<style lang="postcss">
	.product-page {
		.--header {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply my-8;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--form {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mx-auto;
			/* LAYOUT */
			@apply flex flex-col gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			button {
				/* SIZE */
				@apply w-full;
				/* MARGINS AND PADDING */
				@apply p-2 mb-4;
				/* LAYOUT */
				/* BORDERS */
				@apply rounded;
				/* COLORS */
				@apply bg-black text-white;
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
