<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";

	import type { Order } from "$lib/types/order";
	import { format } from "date-fns";
	import { orderUpdates } from "$lib/constants/orderUpdate";

	export let order: Order;

	export let orderStatus: string = order.status;
</script>

<div class="admin-order-header">
	<div>
		<h1>{trans("page.admin.orderInformation.label")}</h1>

		<p class="mb-2">{trans("page.admin.orderId.label")}: <b>{order.id}</b></p>

		<p>
			{trans("page.admin.createdAt.label")}:
			<b>{format(new Date(order.createdAt._seconds * 1000), "MMMM dd, yyyy HH:mm")}</b>
		</p>

		<p>
			{trans("page.admin.updatedAt.label")}:
			<b>{format(new Date(order.updatedAt._seconds * 1000), "MMMM dd, yyyy HH:mm")}</b>
		</p>
	</div>

	<div class="input-group">
		<select id="order-status" name="order-status" bind:value={orderStatus} placeholder="" required>
			<option value={null} disabled selected>
				{trans("page.admin.selectStatusOption.label")}
			</option>

			{#each orderUpdates as update}
				<option value={update}>{update}</option>
			{/each}
		</select>

		<label class="floating-label" for="order-status"
			>{trans("page.admin.orderStatus.label")}
		</label>
	</div>
</div>

<style lang="scss">
	.admin-order-header {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply pb-2 mb-8;
		/* LAYOUT */
		@apply flex justify-between items-start;
		/* BORDERS */
		@apply border-b-2 border-black;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
