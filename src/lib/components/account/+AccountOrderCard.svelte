<script lang="ts">
	import { dashboardAccountOrderRoute } from "$lib/constants/routes/dashboardRoute";
	import type { Order } from "$lib/types/order";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { format } from "date-fns";

	export let order: Order;
</script>

<div class="account-order-card">
	<div class="--group">
		<p>
			{order.id}
		</p>

		<p>{order.shippingAddress.address1}</p>
	</div>

	<div class="--group">
		<p>
			{addCurrencySymbol(order?.total || "0.00")}
		</p>
		<p>
			{order.status}
		</p>
	</div>

	<div class="--group">
		<p>{format(new Date(order.createdAt), "dd MMM, yyyy")}</p>

		<a class="slim-button" href={`${dashboardAccountOrderRoute.path}/${order.id}`}> view </a>
	</div>
</div>

<style lang="postcss">
	.account-order-card {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply p-2;
		/* LAYOUT */
		@apply flex justify-between;
		/* BORDERS */
		@apply border rounded;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--group {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col justify-between gap-2;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
