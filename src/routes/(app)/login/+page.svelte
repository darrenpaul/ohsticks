<script lang="ts">
	import { goto, afterNavigate } from "$app/navigation";
	import { browser } from "$app/environment";
	import { auth, firebaseSignInWithEmailAndPassword } from "$lib/firebase/firebaseClient";
	import { user } from "$lib/firebase/firebaseClient";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { trans } from "$lib/locales/translateCopy";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { forgotPasswordRoute, registerRoute } from "$lib/constants/routes/accountRoute";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import Button2Icon from "$lib/components/icons/+Button2Icon.svelte";

	let previousPage: string = base;
	let email = "";
	let password = "";

	$: {
		if (browser && $user) {
			if (previousPage === $page.url.pathname) {
				goto(homeRoute.path, { replaceState: true });
			} else {
				goto(previousPage, { replaceState: true });
			}
		}
	}

	const handleFormSubmit = async () => {
		track();
		const { user } = await firebaseSignInWithEmailAndPassword(auth, email, password);
	};

	const track = () => {
		dataLayer.push({ event: "login" });
	};

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<div class="login-page">
	<form class="--form" on:submit|preventDefault={handleFormSubmit}>
		<div class="--header">
			<h1>{trans("form.login.title.label")}</h1>

			<p>{trans("form.login.description.label")}</p>
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
			<label class="floating-label" for="email">{trans("form.login.email.label")}</label>
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
			<label class="floating-label" for="email">{trans("form.login.password.label")}</label>
		</div>

		<button>
			<ButtonIcon>
				{trans("form.login.submit.label")}
			</ButtonIcon>
		</button>
	</form>

	<div class="--link-wrapper">
		<a href={registerRoute.path}>
			<Button2Icon>
				{trans("form.login.createAccount.label")}
			</Button2Icon>
		</a>
	</div>

	<div class="--link-wrapper">
		<a href={forgotPasswordRoute.path}>
			{trans("form.login.forgotPassword.label")}
		</a>
	</div>
</div>

<style lang="scss">
	.login-page {
		/* SIZE */
		@apply max-w-[400px];
		/* MARGINS AND PADDING */
		@apply mt-40 mx-auto px-4;
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
