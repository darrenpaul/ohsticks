<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	const supabaseState: Writable<any> = getContext("supabaseState");

	let newPassword: string = "";

	const handleFormSubmit = async () => {
		const { data } = await $supabaseState.auth.updateUser({ password: newPassword });
		if (data) {
			alert("Password updated");
		}
	};
</script>

<form class="account-update-user-password" on:submit|preventDefault={handleFormSubmit}>
	<h4>{trans("page.account.userInformation.label")}</h4>

	<div class="input-group">
		<input
			class={newPassword ? "" : "peer"}
			type="password"
			id="newPassword"
			name="newPassword"
			bind:value={newPassword}
			placeholder=""
			required
		/>
		<label class="floating-label" for="newPassword">
			{trans("page.account.newPassword.label")}
		</label>
	</div>

	<button class="slim-button">{trans("page.account.update.label")}</button>
</form>

<style lang="scss">
	.account-update-user-password {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-8;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
