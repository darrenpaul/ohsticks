<script lang="ts">
	import { getContext } from "svelte";
	import CartIcon from "$lib/components/icons/+CartIcon.svelte";

	const cartState = getContext("cartState");

	const openCart = () => {
		cartState.set(true);
	};
</script>

<button class="navigation-cart-button" on:click={openCart}>
	<p class="--quantity">5</p>
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
