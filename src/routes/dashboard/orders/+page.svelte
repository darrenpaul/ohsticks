<script lang="ts">
	import AccountOrdersList from "$lib/components/account/+AccountOrderList.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import type { Order } from "$lib/types/order";
	import { delivered, paid, processing } from "$lib/constants/orderUpdate";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";

	export let data;
	let orders: Order[] = data.orders;
</script>

<div class="page">
	<ContainWidth background={"bg-white"}>
		<h1>{trans("page.account.orders.label")}</h1>

		<div class="--order-lists">
			<AccountOrdersList
				title={trans("page.account.upcomingOrders.label")}
				orders={orders.filter((order) => [processing, paid].includes(order.status))}
			/>

			<AccountOrdersList
				title={trans("page.account.pastOrders.label")}
				orders={orders.filter((order) => order.status === delivered)}
			/>
		</div>
	</ContainWidth>
</div>

<style lang="postcss">
	.page {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply my-8;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		h1 {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--order-lists {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
