<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import type { Order } from "$lib/types/order";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";

	export let order: Order;
</script>

<div class="admin-order-price-summary">
	<div class="--group">
		<p>{$trans("page.admin.shipping.label")}</p>
		<p>
			<b>{addCurrencySymbol(Number(order.shippingMethod.price).toFixed(2))}</b>
		</p>
	</div>

	<div class="--group">
		<p>{$trans("page.admin.subtotal.label")}</p>
		<p>
			<b>{addCurrencySymbol(order.subtotal)}</b>
		</p>
	</div>

	<div class="--group --total">
		<h3>{$trans("page.admin.total.label")}</h3>
		<h3>
			<b>{addCurrencySymbol(order.total)}</b>
		</h3>
	</div>
</div>

<style lang="scss">
	.admin-order-price-summary {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex flex-col items-end;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--group {
			/* SIZE */
			@apply w-full;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--total {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply py-2 my-2;
			/* LAYOUT */
			/* BORDERS */
			@apply border-t-2 border-black;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
