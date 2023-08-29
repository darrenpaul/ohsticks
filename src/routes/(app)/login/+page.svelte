<script lang="ts">
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import { auth, firebaseSignInWithEmailAndPassword } from "$lib/firebase/firebaseClient";
	import { user } from "$lib/firebase/firebaseClient";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { _ as trans } from "svelte-i18n";

	let email = "";
	let password = "";

	const handleForgotPassword = () => {
		console.log("forgot password");
	};

	const handleFormSubmit = async () => {
		const { user } = await firebaseSignInWithEmailAndPassword(auth, email, password);
	};

	$: {
		if (browser && $user) {
			goto(homeRoute.path, { replaceState: true });
		}
	}
</script>

<div class="login-page">
	<form class="--form" on:submit|preventDefault={handleFormSubmit}>
		<div class="--header">
			<h1>{$trans("form.login.title.label")}</h1>

			<p>{$trans("form.login.description.label")}</p>
		</div>

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
			<label class="floating-label" for="email">{$trans("form.login.email.label")}</label>
		</div>

		<!-- PASSWORD -->
		<div class="--input-group mb-8">
			<input
				class="peer"
				type="password"
				id="password"
				name="password"
				bind:value={password}
				placeholder=""
				required
			/>
			<label class="floating-label" for="email">{$trans("form.login.password.label")}</label>
		</div>

		<button class="submit-button">{$trans("form.login.submit.label")}</button>
	</form>

	<button class="link-button" on:click={handleForgotPassword}
		>{$trans("form.login.forgotPassword.label")}
	</button>
</div>

<style lang="scss">
	.login-page {
		/* SIZE */
		@apply w-[400px];
		/* MARGINS AND PADDING */
		@apply mt-16 mx-auto;
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
	}
</style>
