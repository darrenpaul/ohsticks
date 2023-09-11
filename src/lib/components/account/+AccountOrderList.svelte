<script lang="ts">
	import type { Order } from "$lib/types/order";
	import AccountOrderCard from "./+AccountOrderCard.svelte";
	import { _ as trans } from "svelte-i18n";

	export let title: string;
	export let orders: Order[] = [];
</script>

<div class="account-order-list">
	<h3>{title}</h3>

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
</div>

<style lang="scss">
	.account-order-list {
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
	}
</style>
