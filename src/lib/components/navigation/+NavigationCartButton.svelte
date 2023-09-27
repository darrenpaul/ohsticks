<script lang="ts">
	import { getContext } from "svelte";
	import CartIcon from "$lib/components/icons/+CartIcon.svelte";
	import { cart } from "$lib/stores/cartStore";
	import type { Writable } from "svelte/store";
	import { viewCartEvent } from "$lib/utils/googleTagManager";
	import { cartItemQuantity } from "$lib/utils/cartHelpers";

	const cartState: Writable<boolean> = getContext("cartState");
	let cartQuantity: string;

	$: {
		cartQuantity = cartItemQuantity($cart?.cartItems || []);
	}

	const openCart = () => {
		if ($cart && $cart?.cartItems?.length > 0) {
			cartState.set(true);

			track();
		}
	};

	const track = () => {
		if ($cart && $cart?.cartItems?.length > 0) {
			viewCartEvent($cart?.cartItems);
		}
	};
</script>

<button class="navigation-cart-button" on:click={openCart} aria-label="Open Cart Button">
	{#if Number(cartQuantity) > 0}
		<p class="--quantity">{cartQuantity}</p>
	{/if}
	<CartIcon />
</button>

<style lang="scss">
	.navigation-cart-button {
		/* SIZE */
		@apply h-6;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--quantity {
			/* SIZE */
			@apply w-6 h-6;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply absolute top-0 right-0 translate-x-3 -translate-y-3 grid place-items-center;
			/* BORDERS */
			@apply rounded-full;
			/* COLORS */
			@apply bg-black text-white;
			/* TEXT */
			@apply text-sm font-bold;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
