<script lang="ts">
	import AccountOrdersList from "$lib/components/account/+AccountOrderList.svelte";
	import { _ as trans } from "svelte-i18n";
	import { browser } from "$app/environment";
	import { user } from "$lib/firebase/firebaseClient";
	import type { Order } from "$lib/types/order";
	import { error } from "@sveltejs/kit";
	import { delivered, paid } from "$lib/constants/orderUpdate";

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

<h1>{$trans("page.account.orders.label")}</h1>

<div class="account-order-lists">
	<AccountOrdersList
		title={$trans("page.account.upcomingOrders.label")}
		orders={orders.filter((order) => order.status === paid)}
	/>

	<AccountOrdersList
		title={$trans("page.account.pastOrders.label")}
		orders={orders.filter((order) => order.status === delivered)}
	/>
</div>

<style lang="scss">
	.account-order-lists {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex flex-col gap-4;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
