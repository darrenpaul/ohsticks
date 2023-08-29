<script lang="ts">
	import type { Product } from "$lib/types/product";
	import Rating from "$lib/components/shared/+Rating.svelte";
	import ProductFeatureImageSelect from "./+ProductFeatureImageSelect.svelte";
	import { addToCart } from "$lib/stores/cartStore";
	import { productsRoute } from "$lib/constants/routes/productRoute";
	import { getContext } from "svelte";
	import { _ as trans } from "svelte-i18n";

	const cartState = getContext("cartState");

	export let product: Product;

	const handleAddToCart = () => {
		addToCart(product);
		cartState.set(true);
	};
</script>

<section class="product-feature">
	<ProductFeatureImageSelect {product} />

	<div class="--content">
		<div class="--header">
			<h1>{product.name}</h1>
		</div>

		<Rating />

		<p>
			{product.price}
		</p>

		<p>{product.description}</p>

		<button on:click={handleAddToCart} class="--add-to-cart-button">
			{$trans("component.productFeature.addToCart.label")}
		</button>

		<p>
			{$trans("component.productFeature.categories.label")}

			{#each product.categories as category}
				<a href={`${productsRoute.path}/${category}`}>{category}</a>
			{/each}
		</p>
	</div>
</section>

<style lang="scss">
	.product-feature {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mx-auto;
		/* LAYOUT */
		@apply grid grid-cols-2 gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--content {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--header {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex items-center justify-between;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}

			.--add-to-cart-button {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply px-6 py-4;
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply bg-black text-white;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
