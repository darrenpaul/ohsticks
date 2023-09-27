<script lang="ts">
	import type { CartItem } from "$lib/types/cart";
	import BinIcon from "$lib/components/icons/+BinIcon.svelte";
	import { removeFromCart } from "$lib/stores/cartStore";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import { calculateDiscountPrice } from "$lib/utils/maths";

	const sessionState: Writable<any> = getContext("sessionState");

	export let cartItem: CartItem;
	export let index: number;

	let totalPrice: string;
	let price = Number(cartItem.price);

	$: {
		price = calculateDiscountPrice(cartItem.price, cartItem.discount, cartItem.quantity);
		totalPrice = (Number(price) * cartItem.quantity).toFixed(2);
	}

	const handleRemoveFromCart = async (cartItem: CartItem) => {
		removeFromCart(cartItem, $sessionState, index);
	};
</script>

<div class="cart-menu-item">
	<div class="--group">
		<div class="relative">
			<img class="--image" src={cartItem.image.src} alt={cartItem.name} loading="lazy" />

			<div class="--quantity-wrapper">
				<p>{cartItem.quantity}</p>
			</div>
		</div>

		<div class="--product-details">
			<p>{cartItem.name}</p>
		</div>
	</div>

	<div class="--group">
		<p>{addCurrencySymbol(totalPrice)}</p>

		<button class="--delete-button" on:click={() => handleRemoveFromCart(cartItem)}>
			<BinIcon />
		</button>
	</div>
</div>

<style lang="postcss">
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
	}
</style>
