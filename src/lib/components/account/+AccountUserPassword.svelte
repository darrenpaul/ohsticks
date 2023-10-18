<script lang="ts">
	import { errorNotification, successNotification } from "$lib/constants/notifications";
	import { trans } from "$lib/locales/translateCopy";
	import randomString from "$lib/utils/randomString";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type { Notification } from "$lib/types/notification";

	const notificationState: Writable<Notification[]> = getContext("notificationState");
	const supabaseState: Writable<any> = getContext("supabaseState");

	let newPassword: string;

	const handleFormSubmit = async () => {
		const { error } = await $supabaseState.auth.updateUser({ password: newPassword });

		if (error) {
			notificationState.set([
				...$notificationState,
				{
					id: randomString(5),
					message: error.message,
					type: errorNotification
				}
			]);

			return;
		}

		notificationState.set([
			...$notificationState,
			{
				id: randomString(5),
				message: trans("notification.passwordUpdated.label"),
				type: successNotification
			}
		]);

		newPassword = "";
	};
</script>

<form class="account-user-password" on:submit|preventDefault={handleFormSubmit}>
	<h4>{trans("page.account.changePassword.label")}</h4>

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

	<button class="submit-button w-full">
		{trans("page.account.update.label")}
	</button>
</form>

<style lang="scss">
	.account-user-password {
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
