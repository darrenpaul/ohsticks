<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import ImageUploadInput from "$lib/components/inputs/+ImageUploadInput.svelte";
	import ProductCreateSeoForm from "$lib/components/admin/product/+ProductCreateSeoForm.svelte";
	import ProductCreateContentSections from "$lib/components/admin/product/+ProductCreateContentSections.svelte";
	import type { ContentSection, Image } from "$lib/types/product";
	import ProductCreateInformation from "$lib/components/admin/product/+ProductCreateInformation.svelte";
	import ProductCreatePrice from "$lib/components/admin/product/+ProductCreatePrice.svelte";
	import { adminRole } from "$lib/constants/roles";
	import { error } from "@sveltejs/kit";
	import { brandName } from "$lib/constants/site.js";

	export let data;
	let product = data.body.product;

	let name = product?.name || "";
	let slug = product?.slug || "";
	let brand = product?.brand || brandName;
	let categories = product?.categories.join(", ") || "";
	let description = product?.description || "";
	let contentSections: ContentSection[] = product?.contentSections || [];
	let currencyPrice = product?.currencyPrice || {};
	let quantity = product?.quantity || 10;
	let visible = product?.visible || false;
	let featureImage: Image[] = [product?.featureImage] || [];
	let productImages: Image[] = product?.images || [];

	let metaTitle = product?.meta?.title || "";
	let metaDescription = product?.meta?.description || "";
	let metaKeywords = product?.meta?.keywords || "";
	let twitterImage: Image[] = [product?.meta?.twitter?.image] || [];
	let openGraphImages: Image[] = product?.meta?.openGraph?.images || [];

	const handleFormSubmit = async () => {
		const response = await fetch("/api/admin/product", {
			method: "PUT",

			body: JSON.stringify({
				id: product.id,
				name,
				slug,
				brand,
				categories: categories.split(",").map((category: string) => category.trim()),
				description,
				contentSections,
				currencyPrice,
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
			alert("Product Updated");
			return;
		}
	};
</script>

<p>Update Product</p>

<form class="product-form" on:submit|preventDefault={handleFormSubmit}>
	<ProductCreateInformation bind:name bind:slug bind:brand bind:categories bind:description />

	<!-- CONTENT SECTIONS -->
	<ProductCreateContentSections bind:contentSections />

	<ProductCreatePrice bind:currencyPrice />

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
	<div class="input-group">
		<label for="visible">{trans("form.createProduct.visible.label")}</label>
		<input type="checkbox" id="visible" name="visible" bind:checked={visible} />
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

	<button>Update</button>
</form>

<style lang="scss">
	.product-form {
		/* SIZE */
		@apply w-96;
		/* MARGINS AND PADDING */
		@apply mx-auto;
		/* LAYOUT */
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
</style>
