<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import CheckMarkIcon from "$lib/components/icons/+CheckMarkIcon.svelte";
</script>

<div class="order-confirmation-updates">
	<h2>{$trans("page.order.orderUpdates.label")}</h2>

	<p>
		{$trans("page.order.orderUpdates.description", { values: { email: "apples@apples.com" } })}
	</p>
</div>

<style lang="scss">
	.order-confirmation-updates {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply p-4;
		/* LAYOUT */
		/* BORDERS */
		@apply border rounded;
		/* COLORS */
		@apply border-gray-300;
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
