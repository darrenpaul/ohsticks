<script lang="ts">
	import CheckoutCartList from "$lib/components/checkout/+CheckoutCartList.svelte";
	import CheckoutCouponCode from "$lib/components/checkout/+CheckoutCouponCode.svelte";
	import CheckoutTotals from "$lib/components/checkout/+CheckoutTotals.svelte";
</script>

<div class="checkout-information">
	<div class="--inner">
		<CheckoutCartList />
		<CheckoutCouponCode />
		<CheckoutTotals />
	</div>
</div>

<style lang="postcss">
	.checkout-information {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply p-2 md:p-8;
		/* LAYOUT */
		@apply relative;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--inner {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply fixed;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
