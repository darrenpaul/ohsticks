<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import type { Image } from "$lib/types/product";
	import {
		deleteImagesByPath,
		getImageBucketFromUrl,
		getImageFolderFromUrl,
		getImageMeta,
		getImageNameFromUrl,
		handleImageUpload
	} from "$lib/utils/imageProcessing";
	import { slugString } from "$lib/utils/slugString";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const supabaseState: Writable<any> = getContext("supabaseState");

	export let name = "";
	export let elementId = "";
	export let bucket = "product";
	export let label = "";
	export let multiple = false;
	export let images: Image[] = [];

	let fileInput;

	const onImageDelete = async (imageSrc: string) => {
		const imageBucket = getImageBucketFromUrl(imageSrc);
		const imageFolder = getImageFolderFromUrl(imageSrc);
		const imageName = getImageNameFromUrl(imageSrc);

		const imagePaths = [`${imageFolder}/${imageName}`];
		await deleteImagesByPath(imageBucket, imagePaths, $supabaseState);
		images = images.filter((image) => image?.src !== imageSrc);
	};

	const onImagesToUpload = async (event) => {
		const imageFiles = [...event.target.files];

		const slugName = slugString(name);
		const imagePromises = imageFiles.map((image) =>
			handleImageUpload(slugName, image, bucket, $supabaseState)
		);

		const uploadedImageUrls = await Promise.all(imagePromises);

		const imagesMeta = await Promise.all(
			uploadedImageUrls.map(async (url) => await getImageMeta(url))
		);
		images = imagesMeta;
	};
</script>

<div class="image-upload-input">
	<div class="--header">
		<label for={elementId}>{label}</label>
		<button on:click|preventDefault={() => fileInput.click()} class="slim-button"
			>{trans("form.createProduct.upload.label")}</button
		>
	</div>

	<input
		type="file"
		id={elementId}
		{multiple}
		name="featureImage"
		accept="image/*"
		on:change={(event) => onImagesToUpload(event)}
		hidden
		bind:this={fileInput}
	/>

	<div class="--images">
		{#each images as image}
			<div class="--image-wrapper">
				<img src={image?.src} alt={image?.alt} loading="lazy" />

				<button on:click|preventDefault={() => onImageDelete(image?.src)} class="slim-button">
					Delete
				</button>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.image-upload-input {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--header {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			@apply flex items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
			label {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply mb-2;
				/* LAYOUT */
				@apply block;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply font-bold text-xl;
				/* ANIMATION AND EFFECTS */
			}
		}

		.--images {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-4 flex-wrap;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--image-wrapper {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply p-4;
				/* LAYOUT */
				@apply flex flex-col gap-4 items-center justify-center;
				/* BORDERS */
				@apply border rounded;
				/* COLORS */
				@apply bg-gray-100;
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				img {
					/* SIZE */
					@apply h-52;
					/* MARGINS AND PADDING */
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
			}
		}
	}
</style>
