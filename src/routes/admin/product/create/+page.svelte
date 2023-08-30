<script lang="ts">
	import { user, productStorageBucket } from "$lib/firebase/firebaseClient";
	import { adminRole } from "$lib/constants/roles";
	import randomString from "$lib/utils/randomString";
	import { deleteImage, uploadImage } from "$lib/firebase/firebaseImageUtils";
	import { slugString } from "$lib/utils/slugString";
	import firebaseAuthenticateRole from "$lib/firebase/firebaseAuthenticateRole";
	import { error } from "@sveltejs/kit";
	// import { FIREBASE_SIGNING_KEY } from "$env/static/private";
	import { _ as trans } from "svelte-i18n";
	import ImageUploadInput from "$lib/components/inputs/+ImageUploadInput.svelte";
	import { getYear } from "date-fns";

	let name = "";
	let slug = "";
	let categories = "";
	let description = "";
	let purchasePrice: number;
	let markupPercentage = 25;
	let price: string;
	let quantity = 10;
	let visible = false;
	let featureImage;
	let productImages;

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
				purchasePrice,
				markupPercentage,
				price,
				quantity,
				visible,
				featureImage: featureImageUrl,
				images: imagesUrl
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
	<div class="input-group">
		<label for="name">{$trans("form.createProduct.name.label")}</label>
		<input
			id="name"
			name="name"
			type="text"
			bind:value={name}
			placeholder={$trans("form.createProduct.name.placeholder")}
		/>

		<label for="slug">{$trans("form.createProduct.slug.label")}</label>
		<p id="slug">{slug}</p>
	</div>

	<!-- CATEGORIES -->
	<div class="input-group">
		<label for="categories">{$trans("form.createProduct.categories.label")}</label>
		<input
			id="categories"
			name="categories"
			type="text"
			bind:value={categories}
			placeholder={$trans("form.createProduct.categories.placeholder")}
		/>
		<small>{$trans("form.createProduct.categories.hint")}</small>
	</div>

	<!-- DESCRIPTION -->
	<div class="input-group">
		<label for="description">{$trans("form.createProduct.description.label")}</label>
		<input
			id="description"
			name="description"
			type="text"
			bind:value={description}
			placeholder={$trans("form.createProduct.description.placeholder")}
		/>
	</div>

	<!--PURCHASE PRICE  -->
	<div class="input-group">
		<label for="purchasePrice">{$trans("form.createProduct.purchasePrice.label")}</label>
		<input
			id="purchasePrice"
			name="purchasePrice"
			type="text"
			bind:value={purchasePrice}
			placeholder={$trans("form.createProduct.purchasePrice.placeholder")}
		/>
	</div>

	<!-- MARK UP PERCENTAGE -->
	<div class="input-group">
		<label for="markupPercentage"
			>{$trans("form.createProduct.markupPercentage.label")} {markupPercentage}%</label
		>
		<input type="range" min="0" max="100" id="markupPercentage" bind:value={markupPercentage} />
	</div>

	<!-- PRICE -->
	<div class="input-group">
		<label for="price">{$trans("form.createProduct.price.label")}</label>
		<p id="price">{price}</p>
	</div>

	<!-- QUANTITY -->
	<div class="input-group">
		<label for="quantity">{$trans("form.createProduct.quantity.label")}</label>
		<input
			id="quantity"
			name="quantity"
			type="text"
			bind:value={quantity}
			placeholder={$trans("form.createProduct.quantity.placeholder")}
		/>
	</div>

	<!-- VISIBLE -->
	<div class="input-group">
		<label for="visible">{$trans("form.createProduct.visible.label")}</label>
		<input type="checkbox" id="visible" name="visible" bind:value={visible} />
	</div>

	<!-- FEATURE IMAGE -->
	<div class="input-group">
		<ImageUploadInput
			elementId="featureImage"
			label={$trans("form.createProduct.featureImage.label")}
			bind:images={featureImage}
		/>
	</div>

	<!-- IMAGES -->
	<div class="input-group">
		<ImageUploadInput
			elementId="productImages"
			label={$trans("form.createProduct.productImages.label")}
			multiple={true}
			bind:images={productImages}
		/>
	</div>

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
		.input-group {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			@apply grid;
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
