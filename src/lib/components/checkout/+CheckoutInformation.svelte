<script lang="ts">
	import { onMount } from "svelte";

	let CheckoutCartListComponent;
	let CheckoutCouponCodeComponent;
	let CheckoutTotalsComponent;

	onMount(async () => {
		CheckoutCartListComponent = (await import("$lib/components/checkout/+CheckoutCartList.svelte"))
			.default;

		CheckoutCouponCodeComponent = (
			await import("$lib/components/checkout/+CheckoutCouponCode.svelte")
		).default;

		CheckoutTotalsComponent = (await import("$lib/components/checkout/+CheckoutTotals.svelte"))
			.default;
	});
</script>

<div class="checkout-information">
	<svelte:component this={CheckoutCartListComponent} />

	<svelte:component this={CheckoutCouponCodeComponent} />

	<svelte:component this={CheckoutTotalsComponent} />
</div>

<style lang="scss">
	.checkout-information {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply p-2 md:p-8;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
