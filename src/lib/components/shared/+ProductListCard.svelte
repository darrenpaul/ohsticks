<script lang="ts">
	import Rating from "$lib/components/shared/+Rating.svelte";
	import { productRoute } from "$lib/constants/routes/productRoute";
	import type { Product } from "$lib/types/product";

	export let product: Product;
</script>

<div class="product-list-card">
	<a href={`${productRoute.path}/${product.slug}`}>
		<img src={product.featureImage} alt="Preview" />

		<div class="--content">
			<p>{product.name}</p>
			<p>€{product.price}</p>

			<Rating />
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
			@apply w-full h-[270px];
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply object-cover;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
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
		}
	}
</style>
