<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import { accountRoute } from "$lib/constants/routes/accountRoute";
	import { siteUrl } from "$lib/constants/site.js";
	import { goto } from "$app/navigation";
	import { homeRoute } from "$lib/constants/routes/homeRoute.js";

	export let data;
	let supabase = data.supabase;
	let email = "";

	const handleFormSubmit = async () => {
		await supabase.auth.resetPasswordForEmail("darrenpaul@duck.com", {
			redirectTo: `${siteUrl}/${accountRoute.path}`
		});

		alert("Reset email sent, please check your email");

		goto(homeRoute.path, { replaceState: true });
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
