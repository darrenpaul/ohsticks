<script lang="ts">
	import type { Product } from "$lib/types/product";
	// import Rating from "$lib/components/shared/+Rating.svelte";
	import ProductFeatureImageSelect from "./+ProductFeatureImageSelect.svelte";
	import { addToCart } from "$lib/stores/cartStore";
	import { getContext } from "svelte";
	import { trans } from "$lib/locales/translateCopy";
	import ProductFeatureCategories from "./+ProductFeatureCategories.svelte";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import type { Writable } from "svelte/store";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import { calculateDiscountPrice } from "$lib/utils/maths";

	const cartState: Writable<boolean> = getContext("cartState");

	export let product: Product;
	export let session;

	let discountPrice = 0;
	let onSale = false;

	$: {
		discountPrice = calculateDiscountPrice(Number(product.price), product.discount);
		onSale = product.discount > 0;
	}

	const handleAddToCart = async () => {
		addToCart(product, session);
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

		<div class="--prices">
			<p class={onSale ? "--on-sale" : "--price"}>
				{addCurrencySymbol(product.price)}
			</p>
			{#if onSale}
				<p class="--price">
					{addCurrencySymbol(discountPrice)}
				</p>
			{/if}
		</div>

		<p class="--description">{product.description}</p>

		<div>
			<button on:click={handleAddToCart} aria-label="Add product to cart">
				<ButtonIcon>
					{trans("component.productFeature.addToCart.label")}
				</ButtonIcon>
			</button>
		</div>

		<ProductFeatureCategories {product} />
	</div>
</section>

<style lang="postcss">
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

			.--prices {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex gap-4;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

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

				.--on-sale {
					@extend .--price;

					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					@apply text-gray-400 line-through;
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
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
