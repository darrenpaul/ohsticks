<script lang="ts">
	import { auth, user } from "$lib/firebase/firebaseClient";
	import { updateProfile } from "firebase/auth";
	import { _ as trans } from "svelte-i18n";

	let firstName: string = $user?.displayName?.split(" ")[0] ?? "";
	let lastName: string = $user?.displayName?.split(" ")[1] ?? "";

	const handleFormSubmit = async () => {
		if (!auth.currentUser) return console.error("No user signed in");
		await updateProfile(auth.currentUser, {
			displayName: `${firstName} ${lastName}`
		});
	};
</script>

<form class="account-update-user-profile" on:submit|preventDefault={handleFormSubmit}>
	<h4>{$trans("page.account.userInformation.label")}</h4>

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
			<label class="floating-label" for="firstName">{$trans("page.account.firstName.label")}</label>
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
			<label class="floating-label" for="lastName">{$trans("page.account.lastName.label")}</label>
		</div>
	</div>

	<button class="slim-button">{$trans("page.account.update.label")}</button>
</form>

<style lang="scss">
	.account-update-user-profile {
		/* SIZE */
		/* MARGINS AND PADDING */
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
