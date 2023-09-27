<script lang="ts">
	import type { Order } from "$lib/types/order";
	import AccountOrderCard from "$lib/components/account/+AccountOrderCard.svelte";

	export let title: string;
	export let orders: Order[] = [];
</script>

<div class="account-order-list">
	<h3>{title}</h3>

	<div class="--list">
		{#each orders as order}
			<AccountOrderCard {order} />
		{/each}
	</div>
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
