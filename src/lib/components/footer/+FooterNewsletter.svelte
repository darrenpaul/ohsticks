<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import SendMessageIcon from "$lib/components/icons/+SendMessageIcon.svelte";

	let newsletterEmail: string = "";

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

		newsletterEmail = "";
		form.reset();
	};
</script>

<form on:submit|preventDefault={handleNewsletterSubmit}>
	<div class="input-group">
		<input
			class="peer"
			type="email"
			id="email"
			name="email"
			bind:value={newsletterEmail}
			placeholder=""
		/>

		<label class="floating-label" for="email">
			{$trans("component.footer.newsletter.label")}
		</label>

		<button class="floating-button">
			<SendMessageIcon />
		</button>
	</div>
</form>

<small>
	{$trans("component.footer.newsletter.description")}
</small>

<style lang="scss">
	small {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		@apply text-gray-500;
		/* TEXT */
		@apply text-xs;
		/* ANIMATION AND EFFECTS */
	}
</style>
