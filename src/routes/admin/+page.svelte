<script lang="ts">
	import type { Order } from "$lib/types/order";
	import AdminOrderList from "$lib/components/admin/order/+AdminOrderList.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import { paid } from "$lib/constants/orderUpdate";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import TotalSales from "$lib/components/widgets/+TotalSales.svelte";
	import GrossProfit from "$lib/components/widgets/+GrossProfit.svelte";
	import type { Product } from "$lib/types/product.js";
	import GrossRevenue from "$lib/components/widgets/+GrossRevenue.svelte";

	export let data;

	let products: Product[] = data.products;
	let orders: Order[] = data.orders;
</script>

<ContainWidth background={"bg-white"}>
	<div class="admin-order-page">
		<div class="--widgets">
			<TotalSales {orders} />

			<GrossRevenue {orders} />

			<GrossProfit {orders} {products} />
		</div>

		<div class="--order-list">
			<AdminOrderList
				title={trans("page.admin.readyToProcess.label")}
				orders={orders.filter((order) => order.status === paid)}
			/>
		</div>
	</div>
</ContainWidth>

<style lang="postcss">
	.admin-order-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mt-10;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--widgets {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex gap-4;
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
