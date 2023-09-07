<script lang="ts">
	import CheckoutCartList from "$lib/components/checkout/+CheckoutCartList.svelte";
	import CheckoutCouponCode from "$lib/components/checkout/+CheckoutCouponCode.svelte";
	import CheckoutTotals from "$lib/components/checkout/+CheckoutTotals.svelte";
</script>

<div class="checkout-information">
	<CheckoutCartList />

	<CheckoutCouponCode />

	<CheckoutTotals />
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
