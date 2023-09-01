<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import OrderConfirmationListItem from "$lib/components/order/+OrderConfirmationListItem.svelte";

	export let items;
</script>

<div class="order-confirmation-list">
	<h2>{$trans("page.order.yourOrder.label")}</h2>

	<div class="--list">
		{#each items as item}
			<OrderConfirmationListItem {item} />
		{/each}
	</div>
</div>

<style lang="scss">
	.order-confirmation-list {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		h2 {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-8;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply font-bold text-2xl;
			/* ANIMATION AND EFFECTS */
		}

		.--list {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
