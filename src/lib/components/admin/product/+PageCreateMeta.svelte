<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";

	export let metaTitle = "";
	export let metaDescription = "";
</script>

<h3>Meta</h3>

<!-- OPEN GRAPH TITLE -->
<div class="input-group">
	<input
		class="peer"
		id="metaTitle"
		name="metaTitle"
		type="text"
		bind:value={metaTitle}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">{trans("form.createPage.metaTitle.label")}</label>
</div>

<!-- OPEN GRAPH DESCRIPTION -->
<div class="input-group">
	<textarea
		class="peer"
		id="metaDescription"
		name="metaDescription"
		bind:value={metaDescription}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">{trans("form.createPage.metaDescription.label")}</label>
</div>
