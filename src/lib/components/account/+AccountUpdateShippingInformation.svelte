<script lang="ts">
	import { shippingCountries } from "$lib/constants/shippingCountries";
	import { _ as trans } from "svelte-i18n";

	let country: string = "";
	let address1: string = "";
	let address2: string = "";
	let city: string = "";
	let province: string = "";
	let postalCode: string = "";
	let selectableProvinces: { name: string; isoCode: string }[] = [];

	$: {
		selectableProvinces = shippingCountries.find((item) => item.isoCode === country)?.states || [];
	}

	const handleSubmit = async (event: Event) => {
		// const form = event.target as HTMLFormElement;
		// const formData = new FormData(form);
		// const values = Object.fromEntries(formData.entries());
		// const order = {
		// 	...values,
		// 	email,
		// 	paymentMethod,
		// 	shippingMethod: shippingMethod,
		// 	cart: $cart
		// };
		// const checkoutResponse = await fetch("/api/checkout", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify(order)
		// });
		// const checkoutData = await checkoutResponse.json();
		// if (checkoutData.sessionUrl) {
		// 	trackContinueToPayment();
		// 	window.location = checkoutData.sessionUrl;
		// }
	};
</script>

<form on:submit={handleSubmit} class="shipping-information">
	<h4>{$trans("page.account.shippingInformation.label")}</h4>
	<h1>NOT DONE</h1>

	<!-- COUNTRY/REGION -->
	<div class="input-group">
		<select id="country" name="country" bind:value={country} placeholder="" required>
			<option value={null} disabled selected>
				{$trans("page.account.country.placeholder")}
			</option>

			{#each shippingCountries as country}
				<option value={country.isoCode}>{country.name}</option>
			{/each}
		</select>

		<label class="floating-label" for="country">{$trans("page.account.country.label")}</label>
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
		<label class="floating-label" for="address1">{$trans("page.account.address1.label")}</label>
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
		<label class="floating-label" for="address2">{$trans("page.account.address2.label")}</label>
	</div>

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
		<label class="floating-label" for="city">{$trans("page.account.city.label")}</label>
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
				{$trans("page.account.province.placeholder")}
			</option>

			{#each selectableProvinces as province}
				<option value={province.isoCode}>{province.name}</option>
			{/each}
		</select>

		<label class="floating-label" for="province">{$trans("page.account.province.label")}</label>
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
			{$trans("page.account.postalCode.label")}
		</label>
	</div>

	<button class="slim-button">{$trans("page.account.update.label")}</button>
</form>

<style lang="scss">
	.shipping-information {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
