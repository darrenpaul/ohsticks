<script lang="ts">
	import type { CartItem } from "$lib/types/cart";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";

	export let cartItem: CartItem;
</script>

<div class="checkout-cart-item">
	<div class="--group">
		<div class="relative">
			<img class="--image" src={cartItem.image.src} alt={cartItem.name} loading="lazy" />

			<div class="--quantity-wrapper">
				<p>{cartItem.quantity}</p>
			</div>
		</div>

		<div class="--product-details">
			<p>{cartItem.name}</p>
			<p class="--price">{addCurrencySymbol(cartItem.price)}</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.checkout-cart-item {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex justify-between items-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--group {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex-shrink-0 flex items-center gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--quantity-wrapper {
			/* SIZE */
			@apply w-6 h-6;
			/* MARGINS AND PADDING */
			@apply p-2 md:p-4;
			/* LAYOUT */
			@apply absolute top-0 right-0 flex items-center justify-center translate-x-2 -translate-y-2;
			/* BORDERS */
			@apply rounded-full;
			/* COLORS */
			@apply bg-slate-600 text-white;
			/* TEXT */
			@apply font-bold;
			/* ANIMATION AND EFFECTS */
		}

		.--image {
			/* SIZE */
			@apply w-20 h-20 md:w-24 md:h-24;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex-shrink-0 object-cover;
			/* BORDERS */
			@apply rounded-3xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
			@apply drop-shadow;
		}

		.--product-details {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col;
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
				@apply font-bold;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
