<script lang="ts">
	// import Rating from "$lib/components/shared/+Rating.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import { productRoute } from "$lib/constants/routes/productRoute";
	import type { Product } from "$lib/types/product";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { selectItemEvent } from "$lib/utils/googleTagManager";
	import { calculateDiscountPrice } from "$lib/utils/maths";

	export let product: Product;
	export let index: number;

	let price = product.price;
	let onSale = false;

	$: {
		price = calculateDiscountPrice(product.price, product.discount, 1);
		onSale = product.discount > 0;
	}

	const track = () => {
		selectItemEvent(product, index);
	};
</script>

<div class="product-list-card">
	<a
		href={`${productRoute.path}/${product.slug}`}
		aria-label={`Product ${product.name} ${addCurrencySymbol(price, product.currency)}`}
		on:click={track}
	>
		<div class="relative">
			<img width="250" height="250" src={product.featureImage.src} alt="Preview" loading="lazy" />

			{#if onSale}
				<div class="sale-tag">
					<p>{trans("component.productList.sale.label")}</p>
				</div>
			{/if}
		</div>

		<div class="content">
			<p class="title">{product.name}</p>

			<p class="price">From {addCurrencySymbol(price, product.currency)}</p>

			<!-- <Rating /> -->
		</div>
	</a>
</div>

<style lang="scss">
	@import "./+ProductListCard.scss";
</style>
