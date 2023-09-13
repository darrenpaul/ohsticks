<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import type { Order } from "$lib/types/order";

	export let order: Order;
</script>

<div class="order-confirmation-totals">
	<!-- SUBTOTAL -->
	<div class="--group">
		<p>{trans("page.checkout.subtotal.label")}</p>
		<p>{addCurrencySymbol(order.subtotal)}</p>
	</div>

	<!-- SHIPPING -->
	<div class="--group">
		<p>{trans("page.checkout.shipping.label")}</p>
		<p>{addCurrencySymbol(order.shippingMethod.price)}</p>
	</div>

	<!-- TOTAL -->
	<div class="--group">
		<p class="--total-text">{trans("page.checkout.total.label")}</p>
		<p class="--total-text">{addCurrencySymbol(order.total)}</p>
	</div>
</div>

<style lang="scss">
	.order-confirmation-totals {
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
