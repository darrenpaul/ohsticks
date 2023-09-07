<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import { cart } from "$lib/stores/cartStore";
	import { browser } from "$app/environment";
	import { sumArrayNumbers } from "$lib/utils/maths";
	import type { CartItem } from "$lib/types/cart";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type { ShippingMethod } from "$lib/types/order";

	const shippingMethodState: Writable<ShippingMethod> = getContext("shippingMethod");

	let shippingPrice: string = "0.00";
	let cartItemsTotal: string;
	let total: string;

	if (browser) {
		shippingMethodState.subscribe((value) => {
			shippingPrice = value.price.toFixed(2);
		});
	}

	$: {
		if (browser && $cart && $cart?.cartItems?.length > 0) {
			cartItemsTotal = sumArrayNumbers(
				$cart.cartItems.map((item: CartItem) => Number(item.price) * item.quantity)
			).toFixed(2);
			total = (Number(cartItemsTotal) + Number(shippingPrice)).toFixed(2);
		}
	}
</script>

<div class="checkout-totals">
	<!-- SUBTOTAL -->
	<div class="--group">
		<p>{$trans("page.checkout.subtotal.label")}</p>
		<p>{addCurrencySymbol(cartItemsTotal)}</p>
	</div>

	<!-- SHIPPING -->
	<div class="--group">
		<p>{$trans("page.checkout.shipping.label")}</p>
		<p>{addCurrencySymbol(shippingPrice)}</p>
	</div>

	<!-- TOTAL -->
	<div class="--group">
		<p class="--total-text">{$trans("page.checkout.total.label")}</p>
		<p class="--total-text">{addCurrencySymbol(total)}</p>
	</div>
</div>

<style lang="scss">
	.checkout-totals {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--group {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--total-text {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply font-bold text-xl;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
