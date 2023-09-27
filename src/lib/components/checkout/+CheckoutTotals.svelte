<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import { cart } from "$lib/stores/cartStore";
	import { browser } from "$app/environment";
	import { sumArrayNumbers } from "$lib/utils/maths";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type { ShippingMethod } from "$lib/types/order";
	import { cartSubtotalPrice } from "$lib/utils/cartHelpers";

	const shippingMethodState: Writable<ShippingMethod> = getContext("shippingMethod");

	let shippingPrice: string;
	let subtotal: string;
	let total: string;

	if (browser) {
		shippingMethodState.subscribe((value) => {
			shippingPrice = value.price.toFixed(2);
		});
	}

	$: {
		if (browser && $cart && $cart?.cartItems?.length > 0) {
			subtotal = cartSubtotalPrice($cart?.cartItems);
			total = sumArrayNumbers([Number(subtotal), Number(shippingPrice)]);
		}
	}
</script>

<div class="checkout-totals">
	<!-- SUBTOTAL -->
	<div class="--group">
		<p>{trans("page.checkout.subtotal.label")}</p>
		<p>{addCurrencySymbol(subtotal)}</p>
	</div>

	<!-- SHIPPING -->
	<div class="--group">
		<p>{trans("page.checkout.shipping.label")}</p>
		<p>{addCurrencySymbol(shippingPrice)}</p>
	</div>

	<!-- TOTAL -->
	<div class="--group">
		<p class="--total-text">{trans("page.checkout.total.label")}</p>
		<p class="--total-text">{addCurrencySymbol(total)}</p>
	</div>

	<small>{trans("page.checkout.taxCalculatedAtPayment.label")}</small>
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
