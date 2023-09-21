<script lang="ts">
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";
	import { trans } from "$lib/locales/translateCopy";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import { adminRoute } from "$lib/constants/routes/adminRoute.js";
	import { onMount } from "svelte";

	export let data;

	let { supabase, session } = data;
	let email: string;
	let password: string;

	$: {
		if (browser && session) {
			goto(adminRoute.path, { replaceState: true });
		}
	}

	const handleFormSubmit = async () => {
		const { data } = await supabase.auth.signInWithPassword({ email, password });

		if (data) {
			goto(adminRoute.path, { replaceState: true });
		}
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
</div>

<style lang="postcss">
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
	}
</style>
