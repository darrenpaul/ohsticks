<script lang="ts">
	import type { Order } from "$lib/types/order";
	import { trans } from "$lib/locales/translateCopy";
	import addCurrencySymbol from "$lib/utils/addCurrencySymbol";
	import { formatDate } from "$lib/utils/dateUtils";
	import { dashboardAccountOrderRoute } from "$lib/constants/routes/dashboardRoute";

	export let title: string;
	export let orders: Order[] = [];
</script>

<div class="account-order-list">
	<h3>{title}</h3>

	{#if orders.length === 0}
		<p>No orders</p>
	{/if}

	{#if orders.length > 0}
		<div class="--table-wrapper">
			<table>
				<thead>
					<tr>
						<th scope="col">{trans("component.accountOrderList.customerName.label")}</th>
						<th scope="col">{trans("component.accountOrderList.orderNumber.label")}</th>
						<th scope="col">{trans("component.accountOrderList.amount.label")}</th>
						<th scope="col">{trans("component.accountOrderList.date.label")}</th>
						<th scope="col">{trans("component.accountOrderList.address.label")}</th>
						<th scope="col">{trans("component.accountOrderList.status.label")}</th>
						<th scope="col">
							<span class="sr-only">Edit</span>
						</th>
					</tr>
				</thead>

				<tbody>
					{#each orders as order}
						<tr>
							<th scope="row">
								{`${order.customer.firstName} ${order.customer.lastName}`}
							</th>
							<td>{order.id.slice(0, 10)}</td>
							<td>{addCurrencySymbol(order.total)}</td>
							<td>{formatDate(order.createdAt)}</td>
							<td>{order.shippingAddress.address1}</td>
							<td class={`--status ${order.status}`}>{order.status}</td>
							<td class="text-right">
								<a href={`${dashboardAccountOrderRoute.path}/${order.id}`}>
									{trans("component.accountOrderList.view.label")}
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style lang="postcss">
	.account-order-list {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		h3 {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--table-wrapper {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply relative overflow-x-auto;
			/* BORDERS */
			@apply sm:rounded-lg;
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
			@apply relative overflow-x-auto;

			.--status {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply capitalize font-bold;
				/* ANIMATION AND EFFECTS */

				&.paid {
					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					@apply text-green-500;
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
			}

			table {
				/* SIZE */
				@apply w-full;
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				@apply text-gray-500;
				/* TEXT */
				@apply text-sm text-left;
				/* ANIMATION AND EFFECTS */

				thead {
					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					@apply text-gray-700 bg-gray-50;
					/* TEXT */
					@apply text-xs uppercase;
					/* ANIMATION AND EFFECTS */

					th {
						/* SIZE */
						/* MARGINS AND PADDING */
						@apply px-6 py-3;
						/* LAYOUT */
						/* BORDERS */
						/* COLORS */
						/* TEXT */
						/* ANIMATION AND EFFECTS */
					}
				}

				tbody {
					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */

					tr {
						/* SIZE */
						/* MARGINS AND PADDING */
						/* LAYOUT */
						/* BORDERS */
						@apply border-b;
						/* COLORS */
						@apply bg-white hover:bg-gray-50;
						/* TEXT */
						/* ANIMATION AND EFFECTS */

						th {
							/* SIZE */
							/* MARGINS AND PADDING */
							@apply px-6 py-4;
							/* LAYOUT */
							/* BORDERS */
							/* COLORS */
							@apply text-gray-900;
							/* TEXT */
							@apply font-medium whitespace-nowrap;
							/* ANIMATION AND EFFECTS */
						}

						td {
							/* SIZE */
							/* MARGINS AND PADDING */
							@apply px-6 py-4;
							/* LAYOUT */
							/* BORDERS */
							/* COLORS */
							/* TEXT */
							/* ANIMATION AND EFFECTS */

							a {
								/* SIZE */
								/* MARGINS AND PADDING */
								/* LAYOUT */
								/* BORDERS */
								/* COLORS */
								@apply text-blue-600;
								/* TEXT */
								@apply font-medium hover:underline;
								/* ANIMATION AND EFFECTS */
							}
						}
					}
				}
			}
		}
	}
</style>
