<script lang="ts">
	import { deleteImage } from "$lib/firebase/firebaseImageUtils";
	import type { Image } from "$lib/types/product";
	import { getImageMeta, handleImageUpload } from "$lib/utils/imageProcessing";

	export let name = "";
	export let elementId = "";
	export let label = "";
	export let multiple = false;
	export let images: Image[] = [];

	const onImageDelete = async (imageSrc: string) => {
		await deleteImage(imageSrc);
		images = images.filter((image) => image?.src !== imageSrc);
	};

	const onImagesToUpload = async (event) => {
		const imageFiles = [...event.target.files];

		const imagePromises = imageFiles.map((image) => handleImageUpload(name, image));
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
