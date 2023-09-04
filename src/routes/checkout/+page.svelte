<script lang="ts">
	import { browser } from "$app/environment";
	import CheckoutForm from "$lib/components/checkout/+CheckoutForm.svelte";
	import CheckoutInformation from "$lib/components/checkout/+CheckoutInformation.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";

	// Create a store and update it when necessary...
	const user = writable();
	$: user.set({ name: "pandas" });

	// ...and add it to the context for child components to access
	if (browser) {
		setContext("user", user);
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
