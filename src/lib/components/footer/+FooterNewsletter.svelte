<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import SendMessageIcon from "$lib/components/icons/+SendMessageIcon.svelte";
	import { newsletterSignupEvent } from "$lib/utils/googleTagManager";

	let newsletterEmail: string;

	const handleNewsletterSubmit = async (event: Event) => {
		const form = event.target as HTMLFormElement;

		const formData = new FormData(form);
		const values = Object.fromEntries(formData.entries());

		await fetch("/api/newsletter", {
			method: "POST",
			body: JSON.stringify({
				...values
			})
		});

		newsletterSignupEvent();

		newsletterEmail = "";
		form.reset();
	};
</script>

<form on:submit|preventDefault={handleNewsletterSubmit}>
	<div class="input-group">
		<input
			class="peer dark"
			type="email"
			id="email"
			name="email"
			bind:value={newsletterEmail}
			placeholder=""
		/>

		<label class="floating-label dark" for="email">
			{trans("component.footer.newsletter.label")}
		</label>

		<button class="floating-button" aria-label="Sign up to newsletter">
			<SendMessageIcon />
		</button>
	</div>
</form>

<small>
	{trans("component.footer.newsletter.description")}
</small>

<style lang="scss">
	@import "./+FooterNewsletter.scss";
</style>
