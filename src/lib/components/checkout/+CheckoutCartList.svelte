<script lang="ts">
	import { cart } from "$lib/stores/cartStore";
	import CheckoutCartItem from "$lib/components/checkout/+CheckoutCartItem.svelte";
</script>

<div class="checkout-cart-list">
	{#if $cart?.cartItems.length > 0}
		{#each $cart.cartItems as cartItem}
			<CheckoutCartItem {cartItem} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.checkout-cart-list {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-16;
		/* LAYOUT */
		@apply grid gap-4;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
