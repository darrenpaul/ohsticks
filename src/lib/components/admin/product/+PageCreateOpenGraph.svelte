<script lang="ts">
	import { _ as trans } from "svelte-i18n";

	export let openGraphTitle = "";
	export let openGraphDescription = "";
	export let openGraphType = "";
	export let openGraphImages: { src: string; alt: string; width: number; height: number }[] = [];

	const handleAddImage = () => {
		openGraphImages = [...openGraphImages, { src: "", alt: "", width: 0, height: 0 }];
	};
</script>

<h3>OpenGraph</h3>

<!-- OPEN GRAPH TITLE -->
<div class="input-group">
	<input
		class="peer"
		id="openGraphTitle"
		name="openGraphTitle"
		type="text"
		bind:value={openGraphTitle}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">{$trans("form.createPage.openGraphTitle.label")}</label>
</div>

<!-- OPEN GRAPH DESCRIPTION -->
<div class="input-group">
	<textarea
		class="peer"
		id="openGraphDescription"
		name="openGraphDescription"
		bind:value={openGraphDescription}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">
		{$trans("form.createPage.openGraphDescription.label")}
	</label>
</div>

<!-- OPEN GRAPH TYPE -->
<div class="input-group">
	<input
		class="peer"
		id="openGraphType"
		name="openGraphType"
		type="text"
		bind:value={openGraphType}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">{$trans("form.createPage.openGraphType.label")}</label>
</div>

{#each openGraphImages as image, index}
	<div class="input-group">
		<input
			class="peer"
			type="text"
			id={`openGraphImageSource${index}`}
			name={`openGraphImageSource${index}`}
			bind:value={image.src}
			placeholder=""
			required
		/>

		<label class="floating-label" for={`openGraphImageSource${index}`}>
			{$trans("form.createPage.imageSource.label")}
		</label>
	</div>

	<div class="input-group">
		<input
			class="peer"
			type="text"
			id={`openGraphImageAlt${index}`}
			name={`openGraphImageAlt${index}`}
			bind:value={image.alt}
			placeholder=""
			required
		/>

		<label class="floating-label" for={`openGraphImageAlt${index}`}>
			{$trans("form.createPage.imageAlt.label")}
		</label>
	</div>
{/each}

<button on:click|preventDefault={handleAddImage}>Add Image</button>
