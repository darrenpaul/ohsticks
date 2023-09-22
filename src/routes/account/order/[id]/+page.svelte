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
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";

	export let data;
	let order: Order = data.order;
</script>

<ContainWidth>
	{#if order}
		<div class="order-confirmation-page">
			<div class="--information">
				<OrderConfirmationHeader {order} />

				<OrderConfirmationUpdates {order} />

				<OrderConfirmationShipping {order} />

				<div class="--button-wrapper">
					<a href={`${collectionRoute.path}/all`}>
						<ButtonIcon>
							{trans("page.order.continueShopping.label")}
						</ButtonIcon>
					</a>
				</div>
			</div>

			<div class="--items">
				<OrderConfirmationList items={order.items} />

				<OrderConfirmationTotals {order} />
			</div>
		</div>
	{/if}
</ContainWidth>

<style lang="scss">
	.order-confirmation-page {
		/* SIZE */
		@apply min-h-[100dvh];
		/* MARGINS AND PADDING */
		@apply py-5;
		/* LAYOUT */
		@apply grid grid-cols-2 gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--information {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-8;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--button-wrapper {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply grid grid-cols-2;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */

				a {
					/* SIZE */
					/* MARGINS AND PADDING */
					/* LAYOUT */
					@apply col-start-2;
					/* BORDERS */
					/* COLORS */
					/* TEXT */
					/* ANIMATION AND EFFECTS */
				}
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
