<script lang="ts">
	import { browser } from "$app/environment";
	import { accountOrderRoute } from "$lib/constants/routes/accountRoute";
	import { user } from "$lib/firebase/firebaseClient";
	import type { Order } from "$lib/types/order";
	import { error } from "@sveltejs/kit";
	import { format } from "date-fns";
	import AccountOrderCard from "./+AccountOrderCard.svelte";
	import { _ as trans } from "svelte-i18n";

	let orders: Order[] = [];

	const handleOrderFetch = async () => {
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		const response = await fetch("/api/order", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": accessToken
			}
		});

		const jsonData = await response.json();

		if (jsonData.orders) {
			orders = jsonData.orders;
		}
	};

	if (browser) {
		handleOrderFetch();
	}
</script>

<p>My Orders</p>

<table class="orders-table">
	<thead class="">
		<tr class="--header">
			<th scope="col" class="text-left">{$trans("page.order.orderId.label")}</th>
			<th scope="col" class="">{$trans("page.order.orderDate.label")}</th>
			<th scope="col" class="">{$trans("page.order.shippingAddress.label")}</th>
			<th scope="col" class="">{$trans("page.order.amount.label")}</th>
			<th scope="col" class="">{$trans("page.order.status.label")}</th>
			<th scope="col" class="">{$trans("page.order.action.label")}</th>
		</tr>
	</thead>

	<tbody>
		{#each orders as order}
			<AccountOrderCard {order} />
		{/each}
	</tbody>
</table>

<style lang="scss">
	.orders-table {
		/* SIZE */
		@apply w-full;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		@apply border-b-2 border-black;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--header {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			@apply border-b-2 border-black;
			/* COLORS */
			/* TEXT */
			@apply font-bold;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
