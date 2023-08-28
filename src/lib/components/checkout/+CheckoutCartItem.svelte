<script lang="ts">
	import type { CartItem } from "$lib/types/cart";

	let totalPrice: string;

	export let cartItem: CartItem;

	$: {
		totalPrice = (Number(cartItem.price) * cartItem.quantity).toFixed(2);
	}
</script>

<div class="checkout-cart-item">
	<div class="--group">
		<div class="relative">
			<img class="--image" src={cartItem.image} alt={cartItem.name} />

			<div class="--quantity-wrapper">
				<p>{cartItem.quantity}</p>
			</div>
		</div>

		<div class="--product-details">
			<p>{cartItem.name}</p>
			<p>{cartItem.price}</p>
		</div>
	</div>

	<p>{totalPrice}</p>
</div>

<style lang="scss">
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
			@apply flex items-center gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--quantity-wrapper {
			/* SIZE */
			@apply w-6 h-6;
			/* MARGINS AND PADDING */
			@apply p-4;
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
			@apply w-24 h-24;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply object-cover;
			/* BORDERS */
			@apply rounded-3xl;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
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
		}
	}
</style>
