<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import type { IngAddress, Order } from "$lib/types/order";
	import { shippingCountries } from "$lib/constants/shippingCountries";

	export let order: Order;
	export let shippingAddress: IngAddress;

	let country: string = order.shippingAddress.country;
	let address1: string = order.shippingAddress.address1;
	let address2: string = order.shippingAddress.address2;
	let city: string = order.shippingAddress.city;
	let province: string = order.shippingAddress.province;
	let postalCode: string = order.shippingAddress.postalCode;

	$: {
		selectableProvinces = shippingCountries.find((item) => item.isoCode === country)?.states || [];

		shippingAddress = {
			...shippingAddress,
			country,
			address1,
			address2,
			city,
			province,
			postalCode
		};
	}

	let selectableProvinces: { name: string; isoCode: string }[] = [];
</script>

<div class="admin-order-shipping-information">
	<div class="--header">
		<h3>{trans("page.admin.shippingInformation.label")}</h3>

		<h3>{order.shippingMethod.label}</h3>
	</div>

	<h4>{trans("page.admin.shippingAddress.label")}</h4>

	<form on:submit|preventDefault={() => {}} class="account-update-user-information">
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
		</div>
	</form>

	<h4>{trans("page.admin.customerInformation.label")}</h4>
	<p>{order.customer.firstName} {order.customer.lastName}</p>
	<p>{order.customer.email}</p>
</div>

<style lang="scss">
	.admin-order-shipping-information {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-8;
		/* LAYOUT */
		/* BORDERS */
		@apply border border-gray-300 rounded-md p-4;
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--header {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			@apply flex items-center justify-between;
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
