<script lang="ts">
	import AdminOrderShippingInformation from "$lib/components/admin/order/+AdminOrderShippingInformation.svelte";
	import { browser } from "$app/environment";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import { error } from "@sveltejs/kit";
	import { page } from "$app/stores";
	import type { IngAddress, Order } from "$lib/types/order";
	import AdminOrderHeader from "$lib/components/admin/order/+AdminOrderHeader.svelte";
	import AdminOrderItemList from "$lib/components/admin/order/+AdminOrderItemList.svelte";
	import AdminOrderPriceSummary from "$lib/components/admin/order/+AdminOrderPriceSummary.svelte";

	let order: Order;

	let orderStatus: string;
	let shippingAddress: IngAddress;

	const handleOrderFetch = async () => {
		const response = await fetch(`/api/admin/order?id=${$page.params.id}`, {
			method: "GET"
		});

		const jsonData = await response.json();
		order = await jsonData.order;

		orderStatus = order.status;
		shippingAddress = order.shippingAddress;
	};

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

	if (browser) {
		handleOrderFetch();
	}
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
