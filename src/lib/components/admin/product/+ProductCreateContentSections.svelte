<script lang="ts">
	import type { ContentSection } from "$lib/types/product";
	import { _ as trans } from "svelte-i18n";

	export let contentSections: ContentSection[] = [];

	const onCreateContentSection = () => {
		contentSections = [
			...contentSections,
			{
				subheading: "",
				content: ""
			}
		];
	};

	const onDeleteContentSection = (index: number) => {
		contentSections = contentSections.filter((_, i) => i !== index);
	};
</script>

<div class="product-create-content-sections">
	<div class="--header">
		<h4>{$trans("form.createProduct.contentSection.label")}</h4>

		<button on:click|preventDefault={onCreateContentSection} class="slim-button">
			{$trans("form.createProduct.contentSection.create.label")}
		</button>
	</div>

	{#each contentSections as contentSection, index}
		<div class="input-group">
			<input
				class={contentSection ? "" : "peer"}
				id="contentSection-{index}"
				name="contentSection-{index}"
				bind:value={contentSection.subheading}
				type="text"
				placeholder=""
			/>

			<label class="floating-label" for="contentSection-{index}">
				{$trans("form.createProduct.contentSection.title.label")}
			</label>
		</div>

		<div class="input-group">
			<textarea
				class={contentSection ? "" : "peer"}
				id="contentSection-{index}"
				name="contentSection-{index}"
				bind:value={contentSection.content}
				placeholder=""
			/>

			<label class="floating-label" for="contentSection-{index}">
				{$trans("form.createProduct.contentSection.content.label")}
			</label>

			<button class="slim-button" on:click|preventDefault={() => onDeleteContentSection(index)}>
				{$trans("form.createProduct.contentSection.delete.label")}
			</button>
		</div>
	{/each}
</div>

<style lang="scss">
	.product-create-content-sections {
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
