<script lang="ts">
	import type { Product } from "$lib/types/product";

	export let product: Product;
</script>

<div class="product-feature-image-select">
	<div class="--thumbnail-images">
		{#each [product.featureImage, ...product.images] as productImage}
			<img class="--image" src={productImage} alt="apples" />
		{/each}
	</div>

	<div>
		<img class="--active-image" src={product.featureImage} alt="apples" />
	</div>
</div>

<style lang="scss">
	.product-feature-image-select {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--thumbnail-images {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex-shrink-0;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--image {
				/* SIZE */
				@apply w-24 h-24;
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply object-cover;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}

		.--active-image {
			/* SIZE */
			@apply w-full h-[480px];
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
