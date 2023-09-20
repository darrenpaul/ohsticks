<script lang="ts">
	import AdminOrderShippingInformation from "$lib/components/admin/order/+AdminOrderShippingInformation.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import type { IngAddress, Order } from "$lib/types/order";
	import AdminOrderHeader from "$lib/components/admin/order/+AdminOrderHeader.svelte";
	import AdminOrderItemList from "$lib/components/admin/order/+AdminOrderItemList.svelte";
	import AdminOrderPriceSummary from "$lib/components/admin/order/+AdminOrderPriceSummary.svelte";

	export let data;
	let order: Order = data.order;

	let orderStatus: string;
	let shippingAddress: IngAddress;

	const handleOrderUpdate = async () => {
		await fetch("/api/admin/order", {
			method: "PUT",

			body: JSON.stringify({
				...order,
				shippingAddress,
				status: orderStatus
			})
		});
	};
</script>

<ContainWidth>
	{#if order}
		<div class="admin-order-page">
			<AdminOrderHeader {order} bind:orderStatus />

			<AdminOrderItemList items={order.items} />

			<AdminOrderShippingInformation {order} bind:shippingAddress />

			<AdminOrderPriceSummary {order} />

			<button class="submit-button" on:click={handleOrderUpdate}>Update Order</button>
		</div>
	{/if}
</ContainWidth>

<style lang="scss">
	.admin-order-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply pt-10;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
