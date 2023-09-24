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
		price = calculateDiscountPrice(Number(product.price), product.discount);
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
				<div class="--sale-tag">
					<p>{trans("component.productList.sale.label")}</p>
				</div>
			{/if}
		</div>

		<div class="--content">
			<p class="--title">{product.name}</p>

			<p class="--price">{addCurrencySymbol(price, product.currency)}</p>

			<!-- <Rating /> -->
		</div>
	</a>
</div>

<style lang="scss">
	.product-list-card {
		/* SIZE */
		@apply w-fit h-full;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply grid items-center justify-center overflow-hidden;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		img {
			/* SIZE */
			@apply max-w-[250px] max-h-[250px];
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			@apply object-cover;
			/* BORDERS */
			@apply rounded-md;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
			@apply drop-shadow;
		}

		.--sale-tag {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply px-4 py-1;
			/* LAYOUT */
			@apply absolute bottom-5 left-1/2 -translate-x-1/2;
			/* BORDERS */
			@apply rounded-full border-2;
			/* COLORS */
			@apply bg-red-500 text-white border-white;
			/* TEXT */
			@apply font-bold tracking-wide;
			/* ANIMATION AND EFFECTS */
		}

		.--content {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col items-center justify-center;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--title {
				@apply w-3/4;
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply text-center truncate text-ellipsis break-words;
				/* ANIMATION AND EFFECTS */
			}

			.--price {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply font-bold;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
