<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import FacebookIcon from "$lib/components/icons/+FacebookIcon.svelte";
	import InstagramIcon from "$lib/components/icons/+InstagramIcon.svelte";
	import PinterestIcon from "$lib/components/icons/+PinterestIcon.svelte";
</script>

<div class="socials">
	<a href={$trans("socials.instagram.url")}>
		<InstagramIcon width={32} height={32} />
	</a>

	<a href={$trans("socials.pinterest.url")}>
		<PinterestIcon width={32} height={32} />
	</a>

	<a href={$trans("socials.facebook.url")}>
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
