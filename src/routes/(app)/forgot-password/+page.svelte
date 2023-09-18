<script lang="ts">
	// import { auth } from "$lib/firebase/firebaseClient";
	import { trans } from "$lib/locales/translateCopy";
	import { sendPasswordResetEmail } from "firebase/auth";
	import { loginRoute } from "$lib/constants/routes/accountRoute";

	let email = "";

	const handleFormSubmit = async () => {
		// TODO: Implement
		// await sendPasswordResetEmail(auth, email);
		// alert("Password reset email sent!");
		// window.location.href = loginRoute.path;
	};
</script>

<div class="forgot-password-page">
	<form class="--form" on:submit|preventDefault={handleFormSubmit}>
		<div class="--header">
			<h1>{trans("form.forgotPassword.title.label")}</h1>

			<p>{trans("form.forgotPassword.description.label")}</p>
		</div>

		<!-- EMAIL -->
		<div class="input-group">
			<input
				class="peer"
				type="email"
				id="email"
				name="email"
				bind:value={email}
				placeholder=""
				required
			/>
			<label class="floating-label" for="email">{trans("form.forgotPassword.email.label")}</label>
		</div>

		<button class="submit-button">{trans("form.forgotPassword.submit.label")}</button>
	</form>
</div>

<style lang="scss">
	.forgot-password-page {
		/* SIZE */
		@apply w-[400px];
		/* MARGINS AND PADDING */
		@apply mt-40 mx-auto;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--form {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */

			.--header {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply mb-6;
				/* LAYOUT */
				@apply flex flex-col gap-3;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
			}

			button {
				/* SIZE */
				@apply w-full;
				/* MARGINS AND PADDING */
				@apply mb-4;
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
