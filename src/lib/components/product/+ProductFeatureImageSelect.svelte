<script lang="ts">
	import type { Image, Product } from "$lib/types/product";

	export let product: Product;

	let imageSelection: Image[] = [];
	let activeImage: Image;

	$: {
		imageSelection = [product.featureImage, ...product.images] as Image[];
		activeImage = product.featureImage;
	}
</script>

<div class="product-feature-image-select">
	<div class="--thumbnail-images">
		{#each imageSelection as productImage}
			<button
				on:click={() => (activeImage = productImage)}
				class="block w-24 h-24"
				aria-label="Select product image"
			>
				<img
					class={activeImage === productImage ? "--image-active" : "--image"}
					src={productImage.src}
					alt={product.name}
					loading="lazy"
				/>
			</button>
		{/each}
	</div>

	<div>
		<img src={activeImage.src} alt={product.name} loading="eager" />
	</div>
</div>

<style lang="postcss">
	.product-feature-image-select {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex flex-col-reverse xl:flex-row gap-2;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--thumbnail-images {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex-shrink-0 flex flex-row xl:flex-col gap-2;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--image {
				/* SIZE */
				@apply h-24;
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
	}
</style>
