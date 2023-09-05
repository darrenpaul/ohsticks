<script lang="ts">
	import { _ as trans } from "svelte-i18n";

	export let twitterTitle = "";
	export let twitterDescription = "";
	export let twitterCard = "";
	export let twitterImage = "";
	export let twitterImageAlt = "";
</script>

<h3>Twitter</h3>

<!-- TWITTER TITLE -->
<div class="input-group">
	<input
		class="peer"
		id="twitterTitle"
		name="twitterTitle"
		type="text"
		bind:value={twitterTitle}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">{$trans("form.createPage.twitterTitle.label")}</label>
</div>

<!-- TWITTER DESCRIPTION -->
<div class="input-group">
	<textarea
		class="peer"
		id="twitterDescription"
		name="twitterDescription"
		bind:value={twitterDescription}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">
		{$trans("form.createPage.twitterDescription.label")}
	</label>
</div>

<!-- TWITTER CARD -->
<div class="input-group">
	<input
		class="peer"
		id="twitterCard"
		name="twitterCard"
		type="text"
		bind:value={twitterCard}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">{$trans("form.createPage.twitterCard.label")}</label>
</div>

<!-- TWITTER IMAGE -->
<div class="input-group">
	<input
		class="peer"
		id="twitterImage"
		name="twitterImage"
		type="text"
		bind:value={twitterImage}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">{$trans("form.createPage.imageSource.label")}</label>
</div>

<!-- TWITTER IMAGE ALT -->
<div class="input-group">
	<input
		class="peer"
		id="twitterImageAlt"
		name="twitterImageAlt"
		type="text"
		bind:value={twitterImageAlt}
		placeholder=""
		required
	/>

	<label class="floating-label" for="slug">{$trans("form.createPage.imageAlt.label")}</label>
</div>
