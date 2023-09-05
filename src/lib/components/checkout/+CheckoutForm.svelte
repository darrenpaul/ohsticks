<script lang="ts">
	import { getStatesOfCountry, shippingCountries } from "$lib/constants/shippingCountries";
	import { _ as trans } from "svelte-i18n";
	import { cart } from "$lib/stores/cartStore";
	import { collectionRoute } from "$lib/constants/routes/collectionRoute";
	import ArrowLeftIcon from "$lib/components/icons/+ArrowLeftIcon.svelte";
	import type { IState } from "country-state-city/lib/interface.d.ts";
	import { user } from "$lib/firebase/firebaseClient";

	let emailInputDisabled = false;
	let email: string = "";
	let country: string = "";
	let firstName: string = "";
	let lastName: string = "";
	let address1: string = "";
	let address2: string = "";
	let city: string = "";
	let province: string = "";
	let postalCode: string = "";
	let selectableProvinces: IState[] = [];
	let paymentMethod = "stripe";

	$: {
		selectableProvinces = getStatesOfCountry(country);
		if ($user?.email) {
			email = $user.email;
			emailInputDisabled = true;
		}
	}

	const handleSubmit = async (event: Event) => {
		const form = event.target as HTMLFormElement;

		const formData = new FormData(form);
		const values = Object.fromEntries(formData.entries());

		const order = {
			...values,
			paymentMethod,
			cart: $cart
		};

		const accessToken = await $user?.getIdToken();

		const headers = {
			"Content-Type": "application/json"
		};

		if (accessToken) {
			headers["x-access-token"] = accessToken;
		}

		const checkoutResponse = await fetch("/api/checkout", {
			method: "POST",
			headers,
			body: JSON.stringify(order)
		});

		const checkoutData = await checkoutResponse.json();

		if (checkoutData.sessionUrl) {
			window.location = checkoutData.sessionUrl;
		}
	};
</script>

<form on:submit={handleSubmit} class="checkout-form">
	<h1 class="--title">{$trans("site.brandName")}</h1>

	<h4>{$trans("form.checkout.contact.label")}</h4>

	<!-- EMAIL -->
	<div class="--input-group mb-8">
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
		<label class="floating-label" for="email">{$trans("form.checkout.email.label")}</label>
	</div>

	<h4>{$trans("form.checkout.shippingAddress.label")}</h4>

	<!-- COUNTRY/REGION -->
	<div class="--input-group">
		<select id="country" name="country" bind:value={country} placeholder="" required>
			<option value={null} disabled selected>
				{$trans("form.checkout.country.placeholder")}
			</option>

			{#each shippingCountries as country}
				<option value={country.isoCode}>{country.name}</option>
			{/each}
		</select>

		<label class="floating-label" for="country">{$trans("form.checkout.country.label")}</label>
	</div>

	<div class="--group-2">
		<!-- FIRST NAME -->
		<div class="--input-group">
			<input
				class={firstName ? "" : "peer"}
				type="text"
				id="firstName"
				name="firstName"
				bind:value={firstName}
				placeholder=""
				required
			/>
			<label class="floating-label" for="firstName">{$trans("form.checkout.firstName.label")}</label
			>
		</div>

		<!-- LAST NAME -->
		<div class="--input-group">
			<input
				class={lastName ? "" : "peer"}
				type="text"
				id="lastName"
				name="lastName"
				bind:value={lastName}
				placeholder=""
				required
			/>
			<label class="floating-label" for="lastName">{$trans("form.checkout.lastName.label")}</label>
		</div>
	</div>

	<!-- ADDRESS 1 -->
	<div class="--input-group">
		<input
			class={address1 ? "" : "peer"}
			type="text"
			id="address1"
			name="address1"
			bind:value={address1}
			placeholder=""
			required
		/>
		<label class="floating-label" for="address1">{$trans("form.checkout.address1.label")}</label>
	</div>

	<!-- ADDRESS 2 -->
	<div class="--input-group">
		<input
			class={address2 ? "" : "peer"}
			type="text"
			id="address2"
			name="address2"
			bind:value={address2}
			placeholder=""
		/>
		<label class="floating-label" for="address2">{$trans("form.checkout.address2.label")}</label>
	</div>

	<div class="--group-3">
		<!-- CITY -->
		<div class="--input-group">
			<input
				class={city ? "" : "peer"}
				type="text"
				id="city"
				name="city"
				bind:value={city}
				placeholder=""
				required
			/>
			<label class="floating-label" for="city">{$trans("form.checkout.city.label")}</label>
		</div>

		<!-- PROVINCE -->
		<div class="--input-group">
			<select
				class={province ? "" : "peer"}
				id="province"
				name="province"
				bind:value={province}
				placeholder=""
				required
			>
				<option value={null} disabled selected>
					{$trans("form.checkout.province.placeholder")}
				</option>

				{#each selectableProvinces as province}
					<option value={province.isoCode}>{province.name}</option>
				{/each}
			</select>

			<label class="floating-label" for="province">{$trans("form.checkout.province.label")}</label>
		</div>

		<!-- POSTAL CODE -->
		<div class="--input-group">
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
				{$trans("form.checkout.postalCode.label")}
			</label>
		</div>
	</div>

	<div class="--button-group">
		<a class="link-button" href={`${collectionRoute.path}/all`}>
			<ArrowLeftIcon />
			{$trans("form.checkout.continueShopping.label")}
		</a>

		<button class="submit-button">{$trans("form.checkout.continueToPayment.label")}</button>
	</div>
</form>

<style lang="scss">
	.checkout-form {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply p-2 md:p-8;
		/* LAYOUT */
		/* BORDERS */
		@apply border-0 md:border-r border-gray-300;
		/* COLORS */
		@apply bg-white;
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--title {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-8;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-center;
			/* ANIMATION AND EFFECTS */
		}
		.--input-group {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			@apply relative flex flex-col;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}

		.--group-2 {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-4;
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

		.--button-group {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex flex-col-reverse gap-0 md:grid-cols-2 md:gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
