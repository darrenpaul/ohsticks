<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import { MetaTags } from "svelte-meta-tags";
	import { page } from "$app/stores";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";

	export let data;

	let pageData = data.pageData;
	let pageUrl = "";
	let name = "";
	let email = "";
	let subject = "";
	let message = "";

	$: {
		pageUrl = `${$page.url}`;
	}

	const handleFormSubmit = async (event: Event) => {
		const form = event.target as HTMLFormElement;

		const formData = new FormData(form);
		const values = Object.fromEntries(formData.entries());

		await fetch("/api/contact", {
			method: "POST",
			body: JSON.stringify({
				...values
			})
		});

		name = "";
		email = "";
		subject = "";
		message = "";
		form.reset();
	};
</script>

<div class="contact-page">
	<form class="--form" on:submit|preventDefault={handleFormSubmit}>
		<div class="--header">
			<h1>{trans("form.contact.title.label")}</h1>

			<p>{trans("form.contact.description.label")}</p>
		</div>

		<div class="--group-2">
			<!-- NAME -->
			<div class="input-group mb-8">
				<input
					class={name ? "" : "peer"}
					type="text"
					id="name"
					name="name"
					bind:value={name}
					placeholder=""
					required
				/>
				<label class="floating-label" for="name">{trans("form.contact.name.label")}</label>
			</div>

			<!-- EMAIL -->
			<div class="input-group mb-8">
				<input
					class={email ? "" : "peer"}
					type="email"
					id="email"
					name="email"
					bind:value={email}
					placeholder=""
					required
				/>
				<label class="floating-label" for="email">{trans("form.contact.email.label")}</label>
			</div>
		</div>

		<!-- SUBJECT -->
		<div class="input-group mb-8">
			<input
				class={subject ? "" : "peer"}
				type="text"
				id="subject"
				name="subject"
				bind:value={subject}
				placeholder=""
				required
			/>
			<label class="floating-label" for="email">{trans("form.contact.subject.label")}</label>
		</div>

		<!-- MESSAGE -->
		<div class="input-group mb-8">
			<textarea
				class={message ? "" : "peer"}
				id="message"
				name="message"
				bind:value={message}
				placeholder=""
				required
			/>
			<label class="floating-label" for="message">
				{trans("form.contact.message.label")}
			</label>
		</div>

		<button aria-label="Send contact message">
			<ButtonIcon>
				{trans("form.contact.submit.label")}
			</ButtonIcon>
		</button>
	</form>
</div>

<MetaTags
	title={pageData.title}
	titleTemplate={pageData.title}
	description={pageData.description}
	canonical={pageUrl}
	openGraph={{
		...pageData.openGraph,
		url: pageUrl
	}}
	twitter={{
		...pageData.twitter,
		site: pageUrl
	}}
/>

<style lang="scss">
	.contact-page {
		/* SIZE */
		@apply w-[400px];
		/* MARGINS AND PADDING */
		@apply mt-40 mb-16 mx-auto;
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
		}
	}
</style>
