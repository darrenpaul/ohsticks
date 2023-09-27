<script lang="ts">
	import type { Link } from "$lib/types/link";

	export let crumbs: Link[];
</script>

<div class="crumbs">
	{#each crumbs as crumb, index}
		{#if index < crumbs.length - 1}
			<a href={crumb.path}>{crumb.label}</a>
			<small>/</small>
		{:else}
			<p>{crumb.label}</p>
		{/if}
	{/each}
</div>

<style lang="postcss">
	.crumbs {
		/* SIZE */
		/* MARGINS AND PADDING */
		@apply py-8;
		/* LAYOUT */
		@apply flex gap-2;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		p,
		a {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-sm text-gray-600;
			/* ANIMATION AND EFFECTS */
		}

		small {
			/* SIZE */
			/* MARGINS AND PADDING */
			/* LAYOUT */
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			@apply text-xs text-gray-600;
			/* ANIMATION AND EFFECTS */
		}
	}
</style>
