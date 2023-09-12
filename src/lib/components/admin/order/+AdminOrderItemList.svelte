<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import AdminOrderItem from "./+AdminOrderItem.svelte";
	import type { OrderItem } from "$lib/types/order";

	export let items: OrderItem[] = [];
</script>

<div class="admin-order-item-list">
	<table class="--table">
		<thead class="">
			<tr class="--header">
				<th scope="col" class="text-left">
					{$trans("page.admin.productId.label")}
				</th>
				<th scope="col" class="">{$trans("page.admin.productName.label")}</th>
				<th scope="col" class="">{$trans("page.admin.itemPrice.label")}</th>
				<th scope="col" class="">{$trans("page.admin.quantity.label")}</th>
				<th scope="col" class="text-right">{$trans("page.admin.total.label")}</th>
			</tr>
		</thead>

		<tbody>
			{#each items as item}
				<AdminOrderItem {item} />
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	.admin-order-item-list {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-8;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--table {
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
