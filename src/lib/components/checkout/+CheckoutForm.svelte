<script lang="ts">
	import { shippingCountries } from "$lib/constants/shippingCountries";
	import { _ as trans } from "svelte-i18n";
	import { cart } from "$lib/stores/cartStore";
	import { productsRoute } from "$lib/constants/routes/productRoute";
	import ArrowLeftIcon from "../icons/+ArrowLeftIcon.svelte";

	let email: string = "";
	let country: string = "";
	let firstName: string = "";
	let lastName: string = "";
	let address1: string = "";
	let address2: string = "";
	let city: string = "";
	let province: string = "";
	let postalCode: string = "";

	let selectableProvinces: string[] = [];

	$: {
		selectableProvinces = shippingCountries.find((c) => c.code === country)?.provinces ?? [];
	}

	const handleSubmit = async (event: Event) => {
		const form = event.target as HTMLFormElement;

		const formData = new FormData(form);
		const values = Object.fromEntries(formData.entries());

		const order = {
			...values,
			cart: $cart
		};

		await fetch("/api/checkout", {
			method: "POST",
			body: JSON.stringify(order)
		});
	};
</script>

<form on:submit={handleSubmit} class="checkout-form">
	<h4>{$trans("form.checkout.contact.label")}</h4>

	<!-- EMAIL -->
	<div class="--input-group mb-8">
		<input
			class="peer"
			type="email"
			id="email"
			name="email"
			bind:value={email}
			placeholder=""
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
				<option value={country.code}>{country.name}</option>
			{/each}
		</select>

		<label class="floating-label" for="country">{$trans("form.checkout.country.label")}</label>
	</div>

	<div class="--group-2">
		<!-- FIRST NAME -->
		<div class="--input-group">
			<input
				class="peer"
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
				class="peer"
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
			class="peer"
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
			class="peer"
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
				class="peer"
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
				class="peer"
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
					<option value={province.code}>{province.name}</option>
				{/each}
			</select>

			<label class="floating-label" for="province">{$trans("form.checkout.province.label")}</label>
		</div>

		<!-- POSTAL CODE -->
		<div class="--input-group">
			<input
				class="peer"
				type="text"
				id="postalCode"
				name="postalCode"
				bind:value={postalCode}
				placeholder=""
				required
			/>
			<label class="floating-label" for="postalCode"
				>{$trans("form.checkout.postalCode.label")}</label
			>
		</div>
	</div>

	<div class="--group-2">
		<a class="link-button" href={`${productsRoute.path}/all`}>
			<ArrowLeftIcon />
			{$trans("form.checkout.continueShopping.label")}
		</a>
		<button class="submit-button">{$trans("form.checkout.submit.label")}</button>
	</div>
</form>

<style lang="scss">
	.checkout-form {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

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
			@apply grid grid-cols-3 gap-4;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
