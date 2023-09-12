<script lang="ts">
	import AdminOrderShippingInformation from "$lib/components/admin/order/+AdminOrderShippingInformation.svelte";
	import { browser } from "$app/environment";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import { user } from "$lib/firebase/firebaseClient";
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
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		const response = await fetch(`/api/admin/order?id=${$page.params.id}`, {
			method: "GET",
			headers: {
				"x-access-token": accessToken
			}
		});

		const jsonData = await response.json();
		order = await jsonData.order;

		orderStatus = order.status;
		shippingAddress = order.shippingAddress;
	};

	const handleOrderUpdate = async () => {
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		await fetch("/api/admin/order", {
			method: "PUT",
			headers: {
				"x-access-token": accessToken
			},

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
