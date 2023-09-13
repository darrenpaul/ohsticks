<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";

	export let currencyPrice = {};

	const calculatePrice = (price) => {
		const purchasePriceNumber = Number(price.purchasePrice);
		const markupPercentageNumber = Number(price.markupPercentage);
		const priceNumber = Number(purchasePriceNumber * (1 + markupPercentageNumber / 100)).toFixed(2);
		price.price = priceNumber;
		return priceNumber;
	};

	const onCreate = () => {
		currencyPrice["zar"] = {
			currency: "",
			purchasePrice: 0,
			markupPercentage: 25,
			price: 0
		};
	};
</script>

<div class="product-create-content-sections">
	<div class="--header">
		<h4>{trans("form.createProduct.currencyPrices.label")}</h4>

		<button on:click|preventDefault={onCreate} class="slim-button">
			{trans("form.createProduct.create.label")}
		</button>
	</div>

	{#each Object.values(currencyPrice) as price, index}
		<!-- CURRENCY  -->
		<div class="input-group">
			<input
				class="peer"
				id="currencyPrice-currency-{index}"
				name="currencyPrice-currency-{index}"
				type="text"
				bind:value={price.currency}
				placeholder=""
			/>

			<label class="floating-label" for="currencyPrice-currency-{index}">
				{trans("form.createProduct.currency.label")}
			</label>
		</div>

		<div class="--group-2">
			<!-- PURCHASE PRICE  -->
			<div class="input-group">
				<input
					class="peer"
					id="currencyPrice-purchasePrice-{index}"
					name="currencyPrice-purchasePrice-{index}"
					type="text"
					bind:value={price.purchasePrice}
					placeholder=""
				/>

				<label class="floating-label" for="currencyPrice-purchasePrice-{index}">
					{trans("form.createProduct.purchasePrice.label")}
				</label>
			</div>

			<!-- PRICE -->
			<div class="input-group">
				<label for="currencyPrice-price-{index}">
					{trans("form.createProduct.price.label")}
				</label>
				<p id="currencyPrice-price-{index}">{calculatePrice(price)}</p>
			</div>
		</div>

		<!-- MARK UP PERCENTAGE -->
		<div class="input-group">
			<label for="currencyPrice-markupPercentage-{index}"
				>{trans("form.createProduct.markupPercentage.label")} {price.markupPercentage}%</label
			>
			<input
				type="range"
				min="0"
				max="100"
				id="currencyPrice-markupPercentage-{index}"
				bind:value={price.markupPercentage}
			/>
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

		.--group-2 {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply grid grid-cols-2 gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
