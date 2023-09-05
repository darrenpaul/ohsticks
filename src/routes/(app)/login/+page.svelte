<script lang="ts">
	import { goto, afterNavigate } from "$app/navigation";
	import { browser } from "$app/environment";
	import { auth, firebaseSignInWithEmailAndPassword } from "$lib/firebase/firebaseClient";
	import { user } from "$lib/firebase/firebaseClient";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { _ as trans } from "svelte-i18n";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { forgotPasswordRoute, registerRoute } from "$lib/constants/routes/accountRoute";

	let previousPage: string = base;
	let email = "";
	let password = "";

	const handleFormSubmit = async () => {
		const { user } = await firebaseSignInWithEmailAndPassword(auth, email, password);
	};

	$: {
		if (browser && $user) {
			if (previousPage === $page.url.pathname) {
				goto(homeRoute.path, { replaceState: true });
			} else {
				goto(previousPage, { replaceState: true });
			}
		}
	}

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<div class="login-page">
	<form class="--form" on:submit|preventDefault={handleFormSubmit}>
		<div class="--header">
			<h1>{$trans("form.login.title.label")}</h1>

			<p>{$trans("form.login.description.label")}</p>
		</div>

		<!-- EMAIL -->
		<div class="input-group">
			<input
				class={email ? "" : "peer"}
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
			<label class="floating-label" for="email">{$trans("form.login.password.label")}</label>
		</div>

		<button class="submit-button">{$trans("form.login.submit.label")}</button>
	</form>

	<div class="--link-wrapper">
		<a class="outline-button" href={registerRoute.path}>
			{$trans("form.login.createAccount.label")}
		</a>
	</div>

	<div class="--link-wrapper">
		<a href={forgotPasswordRoute.path}>
			{$trans("form.login.forgotPassword.label")}
		</a>
	</div>
</div>

<style lang="scss">
	.login-page {
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

		.--link-wrapper {
			/* SIZE */
			/* MARGINS AND PADDING */
			@apply mb-4;
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-center;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
