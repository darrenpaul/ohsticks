<script lang="ts">
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
	export let label = "";
	export let multiple = false;
	export let images: Image[] = [];

	const onImageDelete = async (imageSrc: string) => {
		const imageBucket = getImageBucketFromUrl(imageSrc);
		const imageFolder = getImageFolderFromUrl(imageSrc);
		const imageName = getImageNameFromUrl(imageSrc);

		const imagePaths = [`${imageFolder}/${imageName}`];
		await deleteImagesByPath(imageBucket, imagePaths, $supabaseState);
		console.log("onImageDelete ~ imagePaths:", imagePaths);
		images = images.filter((image) => image?.src !== imageSrc);
	};

	const onImagesToUpload = async (event) => {
		const imageFiles = [...event.target.files];

		const slugName = slugString(name);

		const imagePromises = imageFiles.map((image) =>
			handleImageUpload(slugName, image, $supabaseState)
		);
		const uploadedImageUrls = await Promise.all(imagePromises);
		const imagesMeta = await Promise.all(
			uploadedImageUrls.map(async (url) => await getImageMeta(url))
		);
		images = imagesMeta;
	};
</script>

<label for={elementId}>{label}</label>

<input
	style="display:none"
	type="file"
	id={elementId}
	{multiple}
	name="featureImage"
	accept="image/*"
	on:change={(event) => onImagesToUpload(event)}
/>

{#each images as image}
	<div>
		<img src={image?.src} alt={image?.alt} loading="lazy" />
		<button on:click|preventDefault={() => onImageDelete(image?.src)} class="slim-button">
			Delete
		</button>
	</div>
{/each}
