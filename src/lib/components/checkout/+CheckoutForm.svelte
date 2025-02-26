<script lang="ts">
	import { shippingCountries } from "$lib/constants/shippingCountries";
	import { trans } from "$lib/locales/translateCopy";
	import { cart } from "$lib/stores/cartStore";
	import { collectionRoute } from "$lib/constants/routes/collectionRoute";
	import ArrowLeftIcon from "$lib/components/icons/+ArrowLeftIcon.svelte";
	import CheckoutShippingMethod from "$lib/components/checkout/+CheckoutShippingMethod.svelte";
	import { getContext } from "svelte";
	import { browser } from "$app/environment";
	import type { Writable } from "svelte/store";
	import type { ShippingMethod } from "$lib/types/order";
	import { checkoutEvent } from "$lib/utils/googleTagManager";
	import BrandPortraitIcon from "$lib/components/icons/+BrandPortraitIcon.svelte";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import CheckoutInformation from "$lib/components/checkout/+CheckoutInformation.svelte";
	import MobileOnly from "$lib/components/shared/+MobileOnly.svelte";
	import Accordion from "$lib/components/+Accordion.svelte";
	import CartIcon from "$lib/components/icons/+CartIcon.svelte";
	import CaretDownIcon from "$lib/components/icons/+CaretDownIcon.svelte";
	import CaretUpIcon from "$lib/components/icons/+CaretUpIcon.svelte";
	import type { CheckoutPayload } from "$lib/stores/checkout";

	const sessionState: Writable<any> = getContext("sessionState");
	const shippingMethodState: Writable<ShippingMethod> = getContext("shippingMethod");

	let orderSummaryOpen = false;
	let emailInputDisabled = false;
	let email: string;
	let country: string;
	let firstName: string;
	let lastName: string;
	let address1: string;
	let address2: string;
	let city: string;
	let province: string;
	let postalCode: string;
	let selectableProvinces: { name: string; isoCode: string }[];
	let shippingMethod: ShippingMethod;
	let paymentMethod = "stripe";

	if (browser) {
		shippingMethodState.subscribe((value) => {
			shippingMethod = value;
		});
	}

	$: {
		selectableProvinces = shippingCountries.find((item) => item.isoCode === country)?.states || [];

		if ($sessionState) {
			email = $sessionState.user.email;
			emailInputDisabled = true;
		}
	}

	const trackContinueToPayment = () => {
		if ($cart && $cart?.cartItems?.length > 0) {
			checkoutEvent($cart.cartItems);
		}
	};

	const handleSubmit = async (event: Event) => {
		if (!$cart || $cart?.cartItems?.length === 0) {
			return;
		}

		const form = event.target as HTMLFormElement;

		const formData = new FormData(form);
		const values = Object.fromEntries(formData.entries());

		const checkoutPayload: CheckoutPayload = {
			firstName: values.firstName.toString(),
			lastName: values.lastName.toString(),
			address1: values.address1.toString(),
			address2: values.address2.toString(),
			city: values.city.toString(),
			province: values.province.toString(),
			postalCode: values.postalCode.toString(),
			country: values.country.toString(),
			email,
			paymentMethod,
			shippingMethod: shippingMethod,
			cart: $cart
		};

		const checkoutResponse = await fetch("/api/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(checkoutPayload)
		});

		const checkoutData = await checkoutResponse.json();

		if (checkoutData.sessionUrl) {
			trackContinueToPayment();
			window.location = checkoutData.sessionUrl;
		}
	};
</script>

<form on:submit={handleSubmit} class="checkout-form">
	<div class="--branding">
		<a href={homeRoute.path}>
			<BrandPortraitIcon />
		</a>
	</div>

	<MobileOnly>
		<Accordion bind:open={orderSummaryOpen}>
			<div class="--accordion-header" slot="head">
				<div class="--left">
					<CartIcon />
					<p>
						{#if orderSummaryOpen}
							{trans("page.checkout.hideOrderSummary.label")}
						{:else}
							{trans("page.checkout.showOrderSummary.label")}
						{/if}
					</p>
				</div>

				{#if orderSummaryOpen}
					<CaretUpIcon fill="fill-gray-500" />
				{:else}
					<CaretDownIcon fill="fill-gray-500" />
				{/if}
			</div>

			<CheckoutInformation slot="content" />
		</Accordion>
	</MobileOnly>

	<h4>{trans("form.checkout.contact.label")}</h4>

	<!-- EMAIL -->
	<div class="input-group mb-8">
		{#if emailInputDisabled === false}
			<input
				class={email ? "" : "peer"}
				type="email"
				id="email"
				name="email"
				bind:value={email}
				placeholder=""
				disabled={emailInputDisabled}
				required
			/>
			<label class="floating-label" for="email">{trans("form.checkout.email.label")}</label>
		{:else}
			<p>{email}</p>
		{/if}
	</div>

	<h4>{trans("form.checkout.shippingAddress.label")}</h4>

	<!-- COUNTRY/REGION -->
	<div class="input-group">
		<select id="country" name="country" bind:value={country} placeholder="" required>
			<option value={null} disabled selected>
				{trans("form.checkout.country.placeholder")}
			</option>

			{#each shippingCountries as country}
				<option value={country.isoCode}>{country.name}</option>
			{/each}
		</select>

		<label class="floating-label" for="country">{trans("form.checkout.country.label")}</label>
	</div>

	<div class="--group-2">
		<!-- FIRST NAME -->
		<div class="input-group">
			<input
				class={firstName ? "" : "peer"}
				type="text"
				id="firstName"
				name="firstName"
				bind:value={firstName}
				placeholder=""
				required
			/>
			<label class="floating-label" for="firstName">{trans("form.checkout.firstName.label")}</label>
		</div>

		<!-- LAST NAME -->
		<div class="input-group">
			<input
				class={lastName ? "" : "peer"}
				type="text"
				id="lastName"
				name="lastName"
				bind:value={lastName}
				placeholder=""
				required
			/>
			<label class="floating-label" for="lastName">{trans("form.checkout.lastName.label")}</label>
		</div>
	</div>

	<!-- ADDRESS 1 -->
	<div class="input-group">
		<input
			class={address1 ? "" : "peer"}
			type="text"
			id="address1"
			name="address1"
			bind:value={address1}
			placeholder=""
			required
		/>
		<label class="floating-label" for="address1">{trans("form.checkout.address1.label")}</label>
	</div>

	<!-- ADDRESS 2 -->
	<div class="input-group">
		<input
			class={address2 ? "" : "peer"}
			type="text"
			id="address2"
			name="address2"
			bind:value={address2}
			placeholder=""
		/>
		<label class="floating-label" for="address2">{trans("form.checkout.address2.label")}</label>
	</div>

	<div class="--group-3">
		<!-- CITY -->
		<div class="input-group">
			<input
				class={city ? "" : "peer"}
				type="text"
				id="city"
				name="city"
				bind:value={city}
				placeholder=""
				required
			/>
			<label class="floating-label" for="city">{trans("form.checkout.city.label")}</label>
		</div>

		<!-- PROVINCE -->
		<div class="input-group">
			<select
				class={province ? "" : "peer"}
				id="province"
				name="province"
				bind:value={province}
				placeholder=""
				required
			>
				<option value={null} disabled selected>
					{trans("form.checkout.province.placeholder")}
				</option>

				{#each selectableProvinces as province}
					<option value={province.isoCode}>{province.name}</option>
				{/each}
			</select>

			<label class="floating-label" for="province">{trans("form.checkout.province.label")}</label>
		</div>

		<!-- POSTAL CODE -->
		<div class="input-group">
			<input
				class={postalCode ? "" : "peer"}
				type="text"
				id="postalCode"
				name="postalCode"
				bind:value={postalCode}
				placeholder=""
				required
			/>
			<label class="floating-label" for="postalCode">
				{trans("form.checkout.postalCode.label")}
			</label>
		</div>
	</div>

	<!-- SHIPPING METHOD -->
	<CheckoutShippingMethod />

	<div>
		<button class="submit-button w-full">
			{trans("form.checkout.continueToPayment.label")}
		</button>

		<a class="link-button" href={`${collectionRoute.path}/all`}>
			<ArrowLeftIcon />
			{trans("form.checkout.continueShopping.label")}
		</a>
	</div>
</form>

<style lang="postcss">
	.checkout-form {
		/* SIZE */
		@apply h-[100dvh];
		/* MARGINS AND PADDING */
		@apply p-2 md:p-8;
		/* LAYOUT */
		/* BORDERS */
		@apply border-0 md:border-r border-gray-300;
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--branding {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-8;
			/* LAYOUT */
			@apply flex justify-center;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--accordion-header {
			/* SIZE */
			@apply w-full;
			/* MARGINS AND PADDING */
			@apply mb-2;
			/* LAYOUT */
			@apply flex items-center justify-between;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--left {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply flex items-center gap-2;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}

		.--group-2 {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply grid grid-cols-2 gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--group-3 {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply grid grid-cols-1 gap-0 lg:grid-cols-3 md:gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
