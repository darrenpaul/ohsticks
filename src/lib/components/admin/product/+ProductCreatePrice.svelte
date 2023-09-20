<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import type { CurrencyPrice, Price } from "$lib/types/product";

	export let currencyPrice = {};
	let currencyPriceArray: Price[] = Object.values(currencyPrice);

	const createCurrencyObject = () => {
		const newCurrencyPrice: CurrencyPrice = currencyPrice;
		currencyPriceArray.forEach((item) => {
			newCurrencyPrice[item.currency] = {
				...item
			};
		});
	};

	const calculatePrice = (item: Price) => {
		const purchasePriceNumber = Number(item.purchasePrice);
		const markupPercentageNumber = Number(item.markupPercentage);
		const priceNumber = Number(purchasePriceNumber * (1 + markupPercentageNumber / 100)).toFixed(2);
		item.price = priceNumber;
		return priceNumber;
	};

	const onCreate = () => {
		currencyPriceArray = [
			...currencyPriceArray,
			{
				currency: "",
				purchasePrice: 0,
				markupPercentage: 25,
				price: 0
			}
		];
	};
</script>

<div class="product-create-content-sections">
	<div class="--header">
		<h4>{trans("form.createProduct.currencyPrices.label")}</h4>

		<button on:click|preventDefault={onCreate} class="slim-button">
			{trans("form.createProduct.create.label")}
		</button>
	</div>

	{#each currencyPriceArray as item, index}
		<!-- CURRENCY  -->
		<div class="input-group">
			<input
				class="peer"
				id="currencyPrice-currency-{index}"
				name="currencyPrice-currency-{index}"
				type="text"
				bind:value={item.currency}
				placeholder=""
				on:change={createCurrencyObject}
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
					bind:value={item.purchasePrice}
					placeholder=""
					on:change={createCurrencyObject}
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
				<p id="currencyPrice-price-{index}">{calculatePrice(item)}</p>
			</div>
		</div>

		<!-- MARK UP PERCENTAGE -->
		<div class="input-group">
			<label for="currencyPrice-markupPercentage-{index}"
				>{trans("form.createProduct.markupPercentage.label")} {item.markupPercentage}%</label
			>
			<input
				type="range"
				min="0"
				max="100"
				id="currencyPrice-markupPercentage-{index}"
				bind:value={item.markupPercentage}
				on:change={createCurrencyObject}
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
