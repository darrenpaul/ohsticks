<script lang="ts">
	import AccountOrdersList from "$lib/components/account/+AccountOrderList.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import type { Order } from "$lib/types/order";
	import { delivered, paid } from "$lib/constants/orderUpdate";

	export let data;
	let orders: Order[] = data.orders;
</script>

<h1>{trans("page.account.orders.label")}</h1>

<div class="account-order-lists">
	<AccountOrdersList
		title={trans("page.account.upcomingOrders.label")}
		orders={orders.filter((order) => order.status === paid)}
	/>

	<AccountOrdersList
		title={trans("page.account.pastOrders.label")}
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
