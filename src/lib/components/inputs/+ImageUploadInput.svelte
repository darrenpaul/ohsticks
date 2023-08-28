<script lang="ts">
	let imagePreviews = [];

	export let elementId = "";
	export let label = "";
	export let multiple = false;
	export let images;

	const onImagesToUpload = (event) => {
		const imageFiles = [...event.target.files];
		if (!multiple) {
			images = imageFiles[0];
			imagePreviews = [window.URL.createObjectURL(imageFiles[0])];
			return;
		}

		images = imageFiles;
		imagePreviews = imageFiles.map((image) => window.URL.createObjectURL(image));
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

{#each imagePreviews as image}
	<img src={image} alt="Preview" />
{/each}

<style lang="scss">
	/* SIZE */
	/* MARGINS AND PADDING */
	/* LAYOUT */
	/* BORDERS */
	/* COLORS */
	/* TEXT */
	/* ANIMATION AND EFFECTS */
</style>
