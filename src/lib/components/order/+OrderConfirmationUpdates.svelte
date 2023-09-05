<script lang="ts">
	import { created, delivered, paid, processing, shipped } from "$lib/constants/orderUpdate";
	import type { Order } from "$lib/types/order";
	import { _ as trans } from "svelte-i18n";

	export let order: Order;
</script>

<div class="order-confirmation-updates">
	<h2>{$trans("page.order.orderUpdates.label")}</h2>

	<p>
		{$trans("page.order.orderUpdates.description", { values: { email: order.customer.email } })}
	</p>

	<div class="--processing-list">
		<p class={order.status === created ? "font-bold" : ""}>
			{$trans("page.order.processingStates.created.label")}
		</p>
		<p class={order.status === paid ? "font-bold" : ""}>
			{$trans("page.order.processingStates.paid.label")}
		</p>
		<p class={order.status === processing ? "font-bold" : ""}>
			{$trans("page.order.processingStates.processing.label")}
		</p>
		<p class={order.status === shipped ? "font-bold" : ""}>
			{$trans("page.order.processingStates.shipped.label")}
		</p>
		<p class={order.status === delivered ? "font-bold" : ""}>
			{$trans("page.order.processingStates.delivered.label")}
		</p>
	</div>
</div>

<style lang="scss">
	.order-confirmation-updates {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply p-4;
		/* LAYOUT */
		/* BORDERS */
		@apply border rounded;
		/* COLORS */
		@apply border-gray-300;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--processing-list {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mt-4;
			/* LAYOUT */
			@apply flex justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
