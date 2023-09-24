<script lang="ts">
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { trans } from "$lib/locales/translateCopy";
	import { page } from "$app/stores";
	import {
		accountRoute,
		forgotPasswordRoute,
		registerRoute
	} from "$lib/constants/routes/accountRoute";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import Button2Icon from "$lib/components/icons/+Button2Icon.svelte";
	import randomString from "$lib/utils/randomString";
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";
	import { errorNotification } from "$lib/constants/notifications";
	import type { Notification } from "$lib/types/notification";

	export let data;

	const notificationState: Writable<Notification[]> = getContext("notificationState");

	let { supabase, session } = data;
	let email: string;
	let password: string;

	$: {
		if (browser && session) {
			goto(homeRoute.path, { replaceState: true });
		}
	}

	const handleFormSubmit = async () => {
		const nextPage = $page.url.searchParams.get("page");

		const { error } = await supabase.auth.signInWithPassword({ email, password });

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

		track();
		if (nextPage) {
			goto(accountRoute.path, { replaceState: true });
		} else {
			goto(homeRoute.path, { replaceState: true });
		}
	};

	const track = () => {
		dataLayer.push({ event: "login" });
	};
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

		<button aria-label="Login into account">
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
