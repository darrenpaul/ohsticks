<script lang="ts">
	import { user, productStorageBucket } from "$lib/firebase/firebaseClient";
	import { adminRole } from "$lib/constants/roles";
	import randomString from "$lib/utils/randomString";
	import { deleteImage, uploadImage } from "$lib/firebase/firebaseImageUtils";
	import { slugString } from "$lib/utils/slugString";
	import firebaseAuthenticateRole from "$lib/firebase/firebaseAuthenticateRole";
	import { error } from "@sveltejs/kit";
	import { _ as trans } from "svelte-i18n";
	import ImageUploadInput from "$lib/components/inputs/+ImageUploadInput.svelte";
	import ProductCreateSeoForm from "$lib/components/admin/product/+ProductCreateSeoForm.svelte";
	import ProductCreateContentSections from "$lib/components/admin/product/+ProductCreateContentSections.svelte";
	import type { ContentSection } from "$lib/types/product";

	let name = "";
	let slug = "";
	let categories = "";
	let description = "";
	let contentSections: ContentSection[] = [];
	let purchasePrice: number;
	let markupPercentage = 25;
	let price: string;
	let quantity = 10;
	let visible = false;
	let featureImage;
	let productImages;

	let metaTitle = "";
	let metaDescription = "";

	$: {
		price = Number(purchasePrice * (1 + markupPercentage / 100)).toFixed(2);
		slug = slugString(name);
		// Summer 2021, shirt, model 02, red, small = SM21-SH-M02-RD-S-001
	}

	const handleImageUpload = async (imageFile: File) => {
		const slug = slugString(name);
		const imageType = imageFile.type.split("/")[1];
		const imageName = `${slug}-${randomString(5, true)}.${imageType}`;

		return await uploadImage({
			bucketName: productStorageBucket,
			collectionName: slug,
			imageName,
			imageFile: imageFile
		});
	};

	const handleFormSubmit = async () => {
		const accessToken = await $user?.getIdToken();
		if (!accessToken) {
			return error(401, "Unauthorized");
		}
		const { role } = await firebaseAuthenticateRole(accessToken);
		if (!role || role !== adminRole) {
			return error(401, "Unauthorized");
		}
		const featureImageUrl = await handleImageUpload(featureImage);
		const imagePromises = productImages.map((image) => handleImageUpload(image));
		const imagesUrl = await Promise.all(imagePromises);
		const response = await fetch("/api/product", {
			method: "POST",
			headers: {
				"x-access-token": accessToken
			},
			body: JSON.stringify({
				name,
				slug,
				categories: categories.split(",").map((category) => category.trim()),
				description,
				contentSections,
				purchasePrice,
				markupPercentage,
				price,
				quantity,
				visible,
				featureImage: featureImageUrl,
				images: imagesUrl,
				meta: {
					title: metaTitle,
					description: metaDescription
				}
			})
		});
		if (response.ok) {
			alert("Product created");
			return;
		}
		[...imagesUrl, featureImageUrl].forEach((image) => deleteImage(image));
	};
</script>

<p>Create Product</p>

<form class="product-form" on:submit|preventDefault={handleFormSubmit}>
	<!-- NAME -->
	<div class="--input-group">
		<input
			class="peer"
			id="name"
			name="name"
			type="text"
			bind:value={name}
			placeholder=""
			required
		/>

		<label class="floating-label" for="name">{$trans("form.createProduct.name.label")}</label>
	</div>
	<p>{$trans("form.createProduct.slug.label")}</p>
	<p id="slug">{slug}</p>

	<!-- CATEGORIES -->
	<div class="--input-group">
		<input
			class="peer"
			id="categories"
			name="categories"
			type="text"
			bind:value={categories}
			placeholder=""
		/>
		<label class="floating-label" for="categories">
			{$trans("form.createProduct.categories.label")}
		</label>
	</div>

	<!-- DESCRIPTION -->
	<div class="--input-group">
		<textarea
			class={description ? "" : "peer"}
			id="description"
			name="description"
			bind:value={description}
			placeholder=""
		/>
		<label class="floating-label" for="description">
			{$trans("form.createProduct.description.label")}
		</label>
	</div>

	<!-- CONTENT SECTIONS -->
	<ProductCreateContentSections bind:contentSections />

	<!--PURCHASE PRICE  -->
	<div class="--input-group">
		<input
			class="peer"
			id="purchasePrice"
			name="purchasePrice"
			type="text"
			bind:value={purchasePrice}
			placeholder=""
		/>

		<label class="floating-label" for="purchasePrice">
			{$trans("form.createProduct.purchasePrice.label")}
		</label>
	</div>

	<!-- MARK UP PERCENTAGE -->
	<div class="--input-group">
		<label for="markupPercentage"
			>{$trans("form.createProduct.markupPercentage.label")} {markupPercentage}%</label
		>
		<input type="range" min="0" max="100" id="markupPercentage" bind:value={markupPercentage} />
	</div>

	<!-- PRICE -->
	<div class="--input-group">
		<label for="price">{$trans("form.createProduct.price.label")}</label>
		<p id="price">{price}</p>
	</div>

	<!-- QUANTITY -->
	<div class="--input-group">
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
	<div class="--input-group">
		<label for="visible">{$trans("form.createProduct.visible.label")}</label>
		<input type="checkbox" id="visible" name="visible" bind:value={visible} />
	</div>

	<!-- FEATURE IMAGE -->
	<div class="--input-group">
		<ImageUploadInput
			elementId="featureImage"
			label={$trans("form.createProduct.featureImage.label")}
			bind:images={featureImage}
		/>
	</div>

	<!-- IMAGES -->
	<div class="--input-group">
		<ImageUploadInput
			elementId="productImages"
			label={$trans("form.createProduct.productImages.label")}
			multiple={true}
			bind:images={productImages}
		/>
	</div>

	<ProductCreateSeoForm
		searchKeywords={name}
		bind:productDescription={description}
		bind:productContentSections={contentSections}
		bind:metaTitle
		bind:metaDescription
	/>

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
		.--input-group {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			@apply relative flex flex-col;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

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
