<script lang="ts">
	import { _ as trans } from "svelte-i18n";

	export let purchasePrice: number;
	export let markupPercentage = 25;
	export let price: string;

	$: {
		price = Number(purchasePrice * (1 + markupPercentage / 100)).toFixed(2);
	}
</script>

<!--PURCHASE PRICE  -->
<div class="input-group">
	<input
		class="peer"
		id="purchasePrice"
		name="purchasePrice"
		type="text"
		bind:value={purchasePrice}
		placeholder=""
	/>

	<label class="floating-label" for="purchasePrice">
		{$trans("form.createProduct.purchasePrice.label")}
	</label>
</div>

<!-- MARK UP PERCENTAGE -->
<div class="input-group">
	<label for="markupPercentage"
		>{$trans("form.createProduct.markupPercentage.label")} {markupPercentage}%</label
	>
	<input type="range" min="0" max="100" id="markupPercentage" bind:value={markupPercentage} />
</div>

<!-- PRICE -->
<div class="input-group">
	<label for="price">{$trans("form.createProduct.price.label")}</label>
	<p id="price">{price}</p>
</div>
