<script lang="ts">
	import { shippingCountries } from "$lib/constants/shippingCountries";
	import { trans } from "$lib/locales/translateCopy";

	export let session;
	export let account;

	let firstName: string = account.firstName ?? "";
	let lastName: string = account.lastName ?? "";
	let country: string = account.shippingAddress.country ?? "";
	let address1: string = account.shippingAddress.address1 ?? "";
	let address2: string = account.shippingAddress.address2 ?? "";
	let city: string = account.shippingAddress.city ?? "";
	let province: string = account.shippingAddress.province ?? "";
	let postalCode: string = account.shippingAddress.postalCode ?? "";
	let selectableProvinces: { name: string; isoCode: string }[] = [];

	$: {
		selectableProvinces = shippingCountries.find((item) => item.isoCode === country)?.states || [];
	}

	const handleSubmit = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const values = Object.fromEntries(formData.entries());

		await fetch("/api/account", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(values)
		});
	};
</script>

<form on:submit={handleSubmit} class="account-update-user-information">
	<h4>{trans("page.account.userInformation.label")}</h4>

	<p>{session.user?.email}</p>

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
			<label class="floating-label" for="firstName">{trans("page.account.firstName.label")}</label>
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
			<label class="floating-label" for="lastName">{trans("page.account.lastName.label")}</label>
		</div>
	</div>

	<h4>{trans("page.account.shippingInformation.label")}</h4>

	<!-- COUNTRY/REGION -->
	<div class="input-group">
		<select id="country" name="country" bind:value={country} placeholder="" required>
			<option value={null} disabled selected>
				{trans("page.account.country.placeholder")}
			</option>

			{#each shippingCountries as country}
				<option value={country.isoCode}>{country.name}</option>
			{/each}
		</select>

		<label class="floating-label" for="country">{trans("page.account.country.label")}</label>
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
		<label class="floating-label" for="address1">{trans("page.account.address1.label")}</label>
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
		<label class="floating-label" for="address2">{trans("page.account.address2.label")}</label>
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
		<label class="floating-label" for="city">{trans("page.account.city.label")}</label>
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
				{trans("page.account.province.placeholder")}
			</option>

			{#each selectableProvinces as province}
				<option value={province.isoCode}>{province.name}</option>
			{/each}
		</select>

		<label class="floating-label" for="province">{trans("page.account.province.label")}</label>
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
			{trans("page.account.postalCode.label")}
		</label>
	</div>

	<button class="submit-button w-full">{trans("page.account.update.label")}</button>
</form>

<style lang="postcss">
	.account-update-user-information {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-8;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

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
	}
</style>
