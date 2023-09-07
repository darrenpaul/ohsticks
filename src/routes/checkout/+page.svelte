<script lang="ts">
	import { browser } from "$app/environment";
	import CheckoutForm from "$lib/components/checkout/+CheckoutForm.svelte";
	import CheckoutInformation from "$lib/components/checkout/+CheckoutInformation.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import { standardShipping } from "$lib/constants/shippingMethods";

	const shippingMethod = writable();
	$: shippingMethod.set(standardShipping);

	if (browser) {
		setContext("shippingMethod", shippingMethod);
	}
</script>

<ContainWidth>
	<div class="checkout-page">
		<CheckoutForm />

		<CheckoutInformation />
	</div>
</ContainWidth>

<style lang="scss">
	.checkout-page {
		/* SIZE */
		@apply min-h-[100dvh];
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex flex-col md:grid grid-cols-2 gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
