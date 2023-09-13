<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import { user } from "$lib/firebase/firebaseClient";
	import { error } from "@sveltejs/kit";
	import type { ContentSection, Image } from "$lib/types/product";
	import ImageUploadInput from "$lib/components/inputs/+ImageUploadInput.svelte";

	export let name: string;
	export let searchKeywords = "";
	export let productDescription = "";
	export let productContentSections: ContentSection[] = [];
	export let metaTitle = "";
	export let metaDescription = "";
	export let metaKeywords = "";
	export let openGraphImages: Image[] = [];
	export let twitterImage: Image[] = [];

	let isFetching = false;

	const handleSeoGenerate = async () => {
		isFetching = true;
		const accessToken = await $user?.getIdToken();
		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		const response = await fetch("/api/ai", {
			body: JSON.stringify({
				searchPrompt: searchKeywords
			}),
			headers: {
				"x-access-token": accessToken
			},
			method: "POST"
		});
		const jsonData = await response.json();

		parseData(jsonData.choices[0].message.content);

		isFetching = false;
	};

	const parseData = (input: string) => {
		const gptData = JSON.parse(input);

		productDescription = gptData.productDescription;
		productContentSections = gptData.contentSections || [];
		metaTitle = gptData.metaTitle;
		metaDescription = gptData.metaDescription;
		metaKeywords = gptData.keywords.join(", ");
	};
</script>

<div class="product-create-seo">
	<div class="--header">
		<h4>{trans("form.createProduct.seo.label")}</h4>

		<button
			class={`slim-button ${isFetching ? "animate-bounce" : ""}`}
			on:click|preventDefault={handleSeoGenerate}
		>
			{trans("form.createProduct.generateSeo.label")}
		</button>
	</div>

	<!-- SEARCH PROMPT -->
	<div class="input-group">
		<input
			class={searchKeywords ? "" : "peer"}
			id="searchKeywords"
			name="searchKeywords"
			type="text"
			bind:value={searchKeywords}
			placeholder=""
			required
		/>

		<label class="floating-label" for="searchKeywords">
			{trans("form.createProduct.searchKeywords.label")}
		</label>
	</div>

	<!-- TITLE -->
	<div class="input-group">
		<input
			class={metaTitle ? "" : "peer"}
			id="metaTitle"
			name="metaTitle"
			type="text"
			bind:value={metaTitle}
			placeholder=""
			required
		/>

		<label class="floating-label" for="metaTitle">
			{trans("form.createProduct.metaTitle.label")}
		</label>
	</div>

	<!-- DESCRIPTION -->
	<div class="input-group">
		<textarea
			class={metaTitle ? "" : "peer"}
			id="metaDescription"
			name="metaDescription"
			bind:value={metaDescription}
			placeholder=""
			required
		/>

		<label class="floating-label" for="metaDescription">
			{trans("form.createProduct.metaDescription.label")}
		</label>
	</div>

	<!-- KEYWORDS -->
	<div class="input-group">
		<input
			class={metaKeywords ? "" : "peer"}
			id="metaKeywords"
			name="metaKeywords"
			type="text"
			bind:value={metaKeywords}
			placeholder=""
			required
		/>

		<label class="floating-label" for="metaKeywords">
			{trans("form.createProduct.metaKeywords.label")}
		</label>
	</div>

	<!-- TWITTER IMAGE -->
	<div class="input-group">
		<ImageUploadInput
			elementId="twitterImage"
			label={trans("form.createProduct.twitterImage.label")}
			{name}
			bind:images={twitterImage}
		/>
		<small>1200x675</small>
	</div>

	<!-- OPEN GRAPH IMAGES -->
	<div class="input-group">
		<ImageUploadInput
			elementId="openGraphImages"
			label={trans("form.createProduct.openGraphImages.label")}
			{name}
			multiple={true}
			bind:images={openGraphImages}
		/>
		<small>1200x630 Facebook</small>
		<small>1200x627 LinkedIn</small>
		<small>1000x1500 Pinterest</small>
	</div>
</div>

<style lang="scss">
	.product-create-seo {
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
		}
	}
</style>
