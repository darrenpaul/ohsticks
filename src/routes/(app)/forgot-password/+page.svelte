<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import randomString from "$lib/utils/randomString";
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";
	import { errorNotification, successNotification } from "$lib/constants/notifications";
	import type { Notification } from "$lib/types/notification";

	export let data;

	const notificationState: Writable<Notification[]> = getContext("notificationState");

	let supabase = data.supabase;
	let email: string;

	const handleFormSubmit = async () => {
		const { error } = await supabase.auth.resetPasswordForEmail(email);

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
				message: trans("form.forgotPassword.resetEmailSent.label"),
				type: successNotification
			}
		]);

		// goto(homeRoute.path, { replaceState: true });
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

		<button aria-label="Reset account password">
			<ButtonIcon>
				{trans("form.forgotPassword.submit.label")}
			</ButtonIcon>
		</button>
	</form>
</div>

<style lang="scss">
	.forgot-password-page {
		/* SIZE */
		@apply w-[400px];
		/* MARGINS AND PADDING */
		@apply mt-40 mx-auto pb-16;
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
