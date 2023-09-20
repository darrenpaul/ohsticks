<script lang="ts">
	import { browser } from "$app/environment";
	import CheckoutForm from "$lib/components/checkout/+CheckoutForm.svelte";
	import CheckoutInformation from "$lib/components/checkout/+CheckoutInformation.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";
	import { standardShipping } from "$lib/constants/shippingMethods";
	import { checkoutEvent } from "$lib/utils/googleTagManager";
	import { cart } from "$lib/stores/cartStore";

	const shippingMethod = writable();
	$: shippingMethod.set(standardShipping);

	if (browser) {
		setContext("shippingMethod", shippingMethod);
	}

	$: {
		if (browser && $cart.cartItems?.length > 0) {
			track();
		}
	}

	const track = () => {
		checkoutEvent($cart.cartItems);
	};
</script>

<ContainWidth>
	<div class="checkout-page">
		<CheckoutForm />

		<CheckoutInformation />
	</div>
</ContainWidth>

<style lang="postcss">
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
