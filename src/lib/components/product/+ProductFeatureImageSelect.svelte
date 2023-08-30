<script lang="ts">
	import type { Product } from "$lib/types/product";

	export let product: Product;

	let imageSelection = [] as string[];
	let activeImage = "";

	$: {
		imageSelection = [product.featureImage, ...product.images] as string[];
		activeImage = product.featureImage;
	}
</script>

<div class="product-feature-image-select">
	<div class="--thumbnail-images">
		{#each imageSelection as productImage}
			<button on:click={() => (activeImage = productImage)} class="block w-24 h-24">
				<img
					class={activeImage === productImage ? "--image-active" : "--image"}
					src={productImage}
					alt={product.name}
				/>
			</button>
		{/each}
	</div>

	<div>
		<img class="--active-image" src={activeImage} alt={product.name} />
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
			@apply mr-2;
			/* LAYOUT */
			@apply flex-shrink-0 flex flex-col gap-2;
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
				@apply rounded-md;
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
				@apply shadow;
			}
			.--image-active {
				@extend .--image;
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				@apply border border-black;
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
			@apply rounded-md;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
