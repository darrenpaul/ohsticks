<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import CheckMarkIcon from "$lib/components/icons/+CheckMarkIcon.svelte";
	import type { Order } from "$lib/types/order";

	export let order: Order;
</script>

<div class="order-confirmation-header">
	<h2 class="--heading">{trans("page.order.orderConfirmation.label")}</h2>

	<div class="--information">
		<CheckMarkIcon width={48} height={48} />

		<div>
			<p class="--order-number">
				{trans("page.order.order.label", { orderId: order.id })}
			</p>

			<p class="--thank-you">
				{trans("page.order.thankYou.label", {
					name: `${order.customer.firstName} ${order.customer.lastName}`
				})}
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.order-confirmation-header {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex flex-col gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--heading {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply font-bold text-4xl;
			/* ANIMATION AND EFFECTS */
		}

		.--information {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex items-center gap-3;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--order-number {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				@apply text-gray-500;
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}

			.--thank-you {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply font-bold text-2xl;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
