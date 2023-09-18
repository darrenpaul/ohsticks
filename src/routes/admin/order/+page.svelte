<script lang="ts">
	import { onMount } from "svelte";
	import type { Order } from "$lib/types/order";
	import AdminOrderList from "$lib/components/admin/order/+AdminOrderList.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import { delivered, paid, processing, shipped } from "$lib/constants/orderUpdate";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";

	export let data;
	let orders: Order[] = data.orders;
</script>

<ContainWidth background={"bg-white"}>
	<div class="admin-order-page">
		<h2 class="--title">{trans("page.admin.orders.label")}</h2>

		{#if orders}
			<div class="--order-list">
				<AdminOrderList
					title={trans("page.admin.readyToProcess.label")}
					orders={orders.filter(
						(order) => ![paid, processing, shipped, delivered].includes(order.status)
					)}
				/>

				<AdminOrderList
					title={trans("page.admin.readyToProcess.label")}
					orders={orders.filter((order) => order.status === paid)}
				/>

				<AdminOrderList
					title={trans("page.admin.readyToShip.label")}
					orders={orders.filter((order) => order.status === processing)}
				/>

				<AdminOrderList
					title={trans("page.admin.shipped.label")}
					orders={orders.filter((order) => order.status === shipped)}
				/>

				<AdminOrderList
					title={trans("page.admin.delivered.label")}
					orders={orders.filter((order) => order.status === delivered)}
				/>
			</div>
		{/if}
	</div>
</ContainWidth>

<style lang="scss">
	.admin-order-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mt-10;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--title {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--order-list {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply flex flex-col gap-8;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
