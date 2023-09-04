<script lang="ts">
	import { getContext } from "svelte";
	import CheckoutCartList from "$lib/components/checkout/+CheckoutCartList.svelte";
	import CheckoutCouponCode from "$lib/components/checkout/+CheckoutCouponCode.svelte";
	import CheckoutTotals from "$lib/components/checkout/+CheckoutTotals.svelte";

	// Retrieve user store from context
	const user = getContext("user");
	console.log("user:", $user);

	const addPromo = () => {
		console.log("add promo");
		user.set({ name: "apples" });
	};
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
