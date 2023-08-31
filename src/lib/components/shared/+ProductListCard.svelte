<script lang="ts">
	import Rating from "$lib/components/shared/+Rating.svelte";
	import { productRoute } from "$lib/constants/routes/productRoute";
	import type { Product } from "$lib/types/product";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";

	export let product: Product;
</script>

<div class="product-list-card">
	<a href={`${productRoute.path}/${product.slug}`}>
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
		@apply w-fit h-fit;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply grid items-center justify-center overflow-hidden;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		img {
			/* SIZE */
			@apply w-full h-full max-w-[270px] max-h-[270px];
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
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
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
