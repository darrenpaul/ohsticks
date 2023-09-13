<script lang="ts">
	import { slugString } from "$lib/utils/slugString";
	import { trans } from "$lib/locales/translateCopy";

	export let name = "";
	export let slug = "";
	export let brand = "";
	export let categories = "";
	export let description = "";

	$: {
		slug = slugString(name);
	}
</script>

<!-- NAME -->
<div class="input-group">
	<input class="peer" id="name" name="name" type="text" bind:value={name} placeholder="" required />

	<label class="floating-label" for="name">{trans("form.createProduct.name.label")}</label>
</div>

<p>{trans("form.createProduct.slug.label")}</p>

<p id="slug">{slug}</p>

<!-- BRAND -->
<div class="input-group">
	<input
		class="peer"
		id="brand"
		name="brand"
		type="text"
		bind:value={brand}
		placeholder=""
		required
	/>

	<label class="floating-label" for="name">{trans("form.createProduct.brand.label")}</label>
</div>

<!-- CATEGORIES -->
<div class="input-group">
	<input
		class="peer"
		id="categories"
		name="categories"
		type="text"
		bind:value={categories}
		placeholder=""
	/>
	<label class="floating-label" for="categories">
		{trans("form.createProduct.categories.label")}
	</label>
</div>

<!-- DESCRIPTION -->
<div class="input-group">
	<textarea
		class={description ? "" : "peer"}
		id="description"
		name="description"
		bind:value={description}
		placeholder=""
	/>
	<label class="floating-label" for="description">
		{trans("form.createProduct.description.label")}
	</label>
</div>
