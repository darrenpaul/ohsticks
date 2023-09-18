<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";

	let password: string = "";
	let newPassword: string = "";

	const handleFormSubmit = async () => {
		// TODO: Implement
		// const user = auth.currentUser;
		// if (!user || !user.email) return console.error("No user signed in");
		// const credential = EmailAuthProvider.credential(user.email, password);
		// reauthenticateWithCredential(user, credential)
		// 	.then(async () => {
		// 		await updatePassword(user, newPassword);
		// 		// TODO: Show success message
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
	};
</script>

<form class="account-update-user-password" on:submit|preventDefault={handleFormSubmit}>
	<h4>{trans("page.account.userInformation.label")}</h4>

	<!-- FIRST NAME -->
	<div class="input-group">
		<input
			class={password ? "" : "peer"}
			type="password"
			id="password"
			name="password"
			bind:value={password}
			placeholder=""
			required
		/>
		<label class="floating-label" for="password"
			>{trans("page.account.currentPassword.label")}</label
		>
	</div>

	<!-- LAST NAME -->
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
