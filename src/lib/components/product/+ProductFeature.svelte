<script lang="ts">
	import type { Product } from "$lib/types/product";
	// import Rating from "$lib/components/shared/+Rating.svelte";
	import ProductFeatureImageSelect from "./+ProductFeatureImageSelect.svelte";
	import { addToCart } from "$lib/stores/cartStore";
	import { getContext } from "svelte";
	import { _ as trans } from "svelte-i18n";
	import ProductFeatureCategories from "./+ProductFeatureCategories.svelte";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { user } from "$lib/firebase/firebaseClient";

	const cartState = getContext("cartState");

	export let product: Product;

	const handleAddToCart = async () => {
		const accessToken = await $user?.getIdToken();
		addToCart(product, accessToken);
		cartState.set(true);
	};
</script>

<section class="product-feature">
	<ProductFeatureImageSelect {product} />

	<div class="--content">
		<div class="--header">
			<h1 class="--title">{product.name}</h1>
		</div>

		<!-- <Rating /> -->

		<p class="--price">
			{addCurrencySymbol(product.price)}
		</p>

		<p class="--description">{product.description}</p>

		<div>
			<button class="submit-button" on:click={handleAddToCart}>
				{$trans("component.productFeature.addToCart.label")}
			</button>
		</div>

		<ProductFeatureCategories {product} />
	</div>
</section>

<style lang="scss">
	.product-feature {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mx-auto pb-16;
		/* LAYOUT */
		@apply grid grid-cols-1 md:grid-cols-2 gap-8;
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

			.--title {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply text-xl;
				/* ANIMATION AND EFFECTS */
			}

			.--price {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply text-3xl font-bold;
				/* ANIMATION AND EFFECTS */
			}

			.--description {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply text-sm;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
