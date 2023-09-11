<script lang="ts">
	import Rating from "$lib/components/shared/+Rating.svelte";
	import { productRoute } from "$lib/constants/routes/productRoute";
	import type { Product } from "$lib/types/product";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { productClickEvent } from "$lib/utils/googleTagManager";
	import { page } from "$app/stores";

	export let product: Product;

	const track = (product) => {
		const productUrl = `${$page.url.origin}${productRoute.path}/${product.slug}`;
		productClickEvent(product, productUrl);
	};
</script>

<div class="product-list-card">
	<a href={`${productRoute.path}/${product.slug}`} on:click={() => track(product)}>
		<img src={product.featureImage.src} alt="Preview" />

		<div class="--content">
			<p class="--title">{product.name}</p>

			<p class="--price">{addCurrencySymbol(product.price)}</p>

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
