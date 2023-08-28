<script lang="ts">
	import { page } from "$app/stores";
	import { homeRoute } from "$lib/constants/routes/homeRoute";
	import type { Link } from "$lib/types/link";
	import capitalizeWords from "$lib/utils/capitalizeWords";

	let crumbs: Link[];

	$: {
		crumbs = createCrumbs();
	}

	const createCrumbs = () => {
		const slugs = $page.url.pathname.split("/").filter((crumb) => crumb !== "");

		const preparedCrumbs = slugs.map((slug, index) => {
			return {
				label: capitalizeWords(slug),
				name: slug,
				path: index < slugs.length - 1 ? `/${slug}` : undefined
			};
		});

		return [homeRoute, ...preparedCrumbs] as Link[];
	};
</script>

<div class="crumbs">
	{#each crumbs as crumb, index}
		{#if index < crumbs.length - 1}
			<a href={crumb.path}>{crumb.label}</a>
			<p>/</p>
		{:else}
			<p>{crumb.label}</p>
		{/if}
	{/each}
</div>

<style lang="scss">
	.crumbs {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex gap-4;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
