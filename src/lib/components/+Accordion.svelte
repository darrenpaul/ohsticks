<script>
	import { slide } from "svelte/transition";

	export let open = false;

	const handleClick = () => (open = !open);
</script>

<div class="accordion">
	<button type="button" class="--header" on:click={handleClick}>
		<slot name="head" />
	</button>

	{#if open}
		<div transition:slide>
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.accordion {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply mb-4;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		.--header {
			/* SIZE */
			@apply w-full h-full;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply flex justify-center items-center;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
