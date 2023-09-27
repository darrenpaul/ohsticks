<script lang="ts">
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import { trans } from "$lib/locales/translateCopy";
	import OrderConfirmationHeader from "$lib/components/order/+OrderConfirmationHeader.svelte";
	import OrderConfirmationUpdates from "$lib/components/order/+OrderConfirmationUpdates.svelte";
	import type { Order } from "$lib/types/order";
	import OrderConfirmationShipping from "$lib/components/order/+OrderConfirmationShipping.svelte";
	import { collectionRoute } from "$lib/constants/routes/collectionRoute";
	import OrderConfirmationList from "$lib/components/order/+OrderConfirmationList.svelte";
	import OrderConfirmationTotals from "$lib/components/order/+OrderConfirmationTotals.svelte";
	import DesktopOnly from "$lib/components/shared/+DesktopOnly.svelte";
	import MobileOnly from "$lib/components/shared/+MobileOnly.svelte";
	import Accordion from "$lib/components/+Accordion.svelte";
	import CartIcon from "$lib/components/icons/+CartIcon.svelte";
	import CaretDownIcon from "$lib/components/icons/+CaretDownIcon.svelte";
	import CaretUpIcon from "$lib/components/icons/+CaretUpIcon.svelte";

	export let data;
	let order: Order = data.order;
	let orderSummaryOpen = false;
</script>

<ContainWidth>
	{#if order}
		<div class="order-confirmation-page">
			<div class="--information">
				<OrderConfirmationHeader {order} />

				<MobileOnly>
					<Accordion bind:open={orderSummaryOpen}>
						<div class="--accordion-header" slot="head">
							<div class="--left">
								<CartIcon />
								<p>
									{#if orderSummaryOpen}
										{trans("page.checkout.hideOrderSummary.label")}
									{:else}
										{trans("page.checkout.showOrderSummary.label")}
									{/if}
								</p>
							</div>

							{#if orderSummaryOpen}
								<CaretUpIcon fill="fill-gray-500" />
							{:else}
								<CaretDownIcon fill="fill-gray-500" />
							{/if}
						</div>

						<div slot="content">
							<OrderConfirmationList items={order.items} />

							<OrderConfirmationTotals {order} />
						</div>
					</Accordion>
				</MobileOnly>

				<OrderConfirmationUpdates {order} />

				<OrderConfirmationShipping {order} />

				<a class="submit-button" href={`${collectionRoute.path}/all`}>
					{trans("page.order.continueShopping.label")}
				</a>
			</div>

			<DesktopOnly>
				<div class="--items">
					<OrderConfirmationList items={order.items} />

					<OrderConfirmationTotals {order} />
				</div>
			</DesktopOnly>
		</div>
	{/if}
</ContainWidth>

<style lang="postcss">
	.order-confirmation-page {
		/* SIZE */
		@apply min-h-[100dvh];
		/* MARGINS AND PADDING */
		@apply py-5;
		/* LAYOUT */
		@apply grid grid-cols-1 md:grid-cols-2 gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--information {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--accordion-header {
			/* SIZE */
			@apply w-full;
			/* MARGINS AND PADDING */
			@apply mb-2;
			/* LAYOUT */
			@apply flex items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--left {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex items-center gap-2;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}

		.--items {
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
