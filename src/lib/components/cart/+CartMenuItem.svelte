<script lang="ts">
	import type { CartItem } from "$lib/types/cart";
	import BinIcon from "$lib/components/icons/+BinIcon.svelte";
	import { removeFromCart } from "$lib/stores/cartStore";

	let totalPrice: string;

	export let cartItem: CartItem;

	$: {
		totalPrice = (Number(cartItem.price) * cartItem.quantity).toFixed(2);
	}
</script>

<div class="cart-menu-item">
	<div class="--group">
		<img class="--image" src={cartItem.image} alt={cartItem.name} />

		<div class="--product-details">
			<p>{cartItem.name}</p>

			<p>QTY: {cartItem.quantity}</p>
		</div>
	</div>

	<div class="--group">
		<p>{totalPrice}</p>

		<button class="--delete-button" on:click={() => removeFromCart(cartItem)}>
			<BinIcon />
		</button>
	</div>
</div>

<style lang="scss">
	.cart-menu-item {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex justify-between items-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply cursor-pointer;

		.--delete-button {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply hidden;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		&:hover {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--delete-button {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply block;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}

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
