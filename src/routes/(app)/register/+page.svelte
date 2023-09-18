<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import { loginRoute } from "$lib/constants/routes/accountRoute";
	import { browser } from "$app/environment";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import { goto } from "$app/navigation";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import Button2Icon from "$lib/components/icons/+Button2Icon.svelte";

	export let data;
	let { supabase, session } = data;

	let firstName: string = "";
	let lastName: string = "";
	let email: string = "";
	let password: string = "";
	let shippingAddress = {
		address1: "",
		address2: "",
		city: "",
		province: "",
		postalCode: "",
		country: ""
	};

	$: {
		if (browser && session) {
			goto(homeRoute.path, { replaceState: true });
		}
	}

	const handleFormSubmit = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});

		const response = await fetch("/api/account", {
			method: "POST",
			body: JSON.stringify({
				firstName,
				lastName,
				emailAddress: email,
				password,
				shippingAddress
			})
		});

		// if (!response.ok) {
		// 	const message = await response.text();
		// 	throw new Error(message);
		// }

		// track();

		// const { user } = await firebaseSignInWithEmailAndPassword(auth, email, password);
		// alert("Account created successfully!");
	};

	const track = () => {
		dataLayer.push({ event: "sign_up" });
	};
</script>

<div class="register-page">
	<form class="--form" on:submit|preventDefault={handleFormSubmit}>
		<div class="--header">
			<h1>{trans("form.register.title.label")}</h1>

			<p>{trans("form.register.description.label")}</p>
		</div>

		<div class="--group-2">
			<!-- FIRST NAME -->
			<div class="input-group">
				<input
					class={firstName ? "" : "peer"}
					type="text"
					id="firstName"
					name="firstName"
					bind:value={firstName}
					placeholder=""
					required
				/>
				<label class="floating-label" for="firstName"
					>{trans("form.register.firstName.label")}</label
				>
			</div>

			<!-- LAST NAME -->
			<div class="input-group">
				<input
					class={lastName ? "" : "peer"}
					type="text"
					id="lastName"
					name="lastName"
					bind:value={lastName}
					placeholder=""
					required
				/>
				<label class="floating-label" for="lastName">{trans("form.register.lastName.label")}</label>
			</div>
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
			<label class="floating-label" for="email">{trans("form.register.email.label")}</label>
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
			<label class="floating-label" for="email">{trans("form.register.password.label")}</label>
		</div>

		<button>
			<ButtonIcon>
				{trans("form.register.submit.label")}
			</ButtonIcon>
		</button>
	</form>

	<div class="--link-wrapper">
		<a href={loginRoute.path}>
			<Button2Icon>
				{trans("form.register.login.label")}
			</Button2Icon>
		</a>
	</div>
</div>

<style lang="scss">
	.register-page {
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

			.--group-2 {
				/* SIZE */
				/* MARGINS AND PADDING */
				/* LAYOUT */
				@apply grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-4;
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				/* ANIMATION AND EFFECTS */
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
