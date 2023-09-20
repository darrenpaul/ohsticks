<script lang="ts">
	import { trans } from "$lib/locales/translateCopy";
	import FacebookIcon from "$lib/components/icons/+FacebookIcon.svelte";
	import InstagramIcon from "$lib/components/icons/+InstagramIcon.svelte";
	import PinterestIcon from "$lib/components/icons/+PinterestIcon.svelte";
</script>

<div class="socials">
	<a href={trans("socials.instagram.url")} aria-label="Go to Instagram page">
		<InstagramIcon width={32} height={32} />
	</a>

	<a href={trans("socials.pinterest.url")} aria-label="Go to Pinterest page">
		<PinterestIcon width={32} height={32} />
	</a>

	<a href={trans("socials.facebook.url")} aria-label="Go to Facebook page">
		<FacebookIcon width={32} height={32} />
	</a>
</div>

<style lang="scss">
	.socials {
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
