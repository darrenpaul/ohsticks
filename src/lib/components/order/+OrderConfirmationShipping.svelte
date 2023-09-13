<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import type { Order } from "$lib/types/order";

	export let order: Order;
</script>

<div class="order-confirmation-shipping">
	<h2>{trans("page.order.shippingAddress.label")}</h2>

	<div>
		<p>
			{order?.customer.email}
		</p>
	</div>

	<div>
		<p>
			{order?.shippingAddress?.address1}
		</p>

		<p>
			{order?.shippingAddress?.address2}
		</p>

		<p>
			{order?.shippingAddress?.city}
		</p>

		<p>
			{order?.shippingAddress?.country}
		</p>

		<p>
			{order?.shippingAddress?.postalCode}
		</p>
	</div>
</div>

<style lang="scss">
	.order-confirmation-shipping {
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
	}
</style>
