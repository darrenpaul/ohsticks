<script lang="ts">
	import { user } from "$lib/firebase/firebaseClient";
	import { deleteImage } from "$lib/firebase/firebaseImageUtils";
	import { _ as trans } from "svelte-i18n";
	import ImageUploadInput from "$lib/components/inputs/+ImageUploadInput.svelte";
	import ProductCreateSeoForm from "$lib/components/admin/product/+ProductCreateSeoForm.svelte";
	import ProductCreateContentSections from "$lib/components/admin/product/+ProductCreateContentSections.svelte";
	import type { ContentSection, Image } from "$lib/types/product";
	import ProductCreateInformation from "$lib/components/admin/product/+ProductCreateInformation.svelte";
	import ProductCreatePrice from "$lib/components/admin/product/+ProductCreatePrice.svelte";
	import firebaseAuthenticateRole from "$lib/firebase/firebaseAuthenticateRole";
	import { adminRole } from "$lib/constants/roles";
	import { error } from "@sveltejs/kit";
	import { brandName } from "$lib/constants/site";

	let name: string;
	let slug = "";
	let brand = brandName;
	let categories = "";
	let description = "";
	let contentSections: ContentSection[] = [];
	let purchasePrice: number;
	let markupPercentage = 25;
	let price: string;
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
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}
		const { role } = await firebaseAuthenticateRole(accessToken);
		if (!role || role !== adminRole) {
			return error(401, "Unauthorized");
		}

		const response = await fetch("/api/admin/product", {
			method: "POST",
			headers: {
				"x-access-token": accessToken
			},
			body: JSON.stringify({
				name,
				slug,
				brand,
				categories: categories.split(",").map((category) => category.trim()),
				description,
				contentSections,
				purchasePrice,
				markupPercentage,
				price,
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

		[...featureImage, ...productImages, ...openGraphImages, ...twitterImage].forEach((image) =>
			deleteImage(image.src)
		);
	};
</script>

<p>Create Product</p>

<form class="product-form" on:submit|preventDefault={handleFormSubmit}>
	<ProductCreateInformation bind:name bind:slug bind:brand bind:categories bind:description />

	<!-- CONTENT SECTIONS -->
	<ProductCreateContentSections bind:contentSections />

	<ProductCreatePrice bind:purchasePrice bind:markupPercentage bind:price />

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
			{$trans("form.createProduct.quantity.label")}
		</label>
	</div>

	<!-- VISIBLE -->
	<div class="input-group">
		<label for="visible">{$trans("form.createProduct.visible.label")}</label>
		<input type="checkbox" id="visible" name="visible" bind:checked={visible} />
	</div>

	{#if name}
		<!-- FEATURE IMAGE -->
		<div class="input-group">
			<ImageUploadInput
				elementId="featureImage"
				label={$trans("form.createProduct.featureImage.label")}
				{name}
				bind:images={featureImage}
			/>
		</div>

		<!-- IMAGES -->
		<div class="input-group">
			<ImageUploadInput
				elementId="productImages"
				label={$trans("form.createProduct.productImages.label")}
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

	<button>Create</button>
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
