<script lang="ts">
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import { trans } from "$lib/locales/translateCopy";
</script>

<div class="feature">
	<picture>
		<source
			media="(max-width:465px)"
			srcset="https://pziocbmxbpurobqznrjs.supabase.co/storage/v1/object/public/page/home/ohsticks-homepage-feature-910x1256.webp"
		/>

		<img
			src="https://pziocbmxbpurobqznrjs.supabase.co/storage/v1/object/public/page/home/ohsticks-homepage-feature.webp"
			alt="wall full of stickers from OhSticks"
			loading="eager"
		/>
	</picture>

	<div class="--title">
		<h1>Stick it to the man with OhSticks</h1>

		<h2>
			Make your mark and show off your style with our trendy decals.<br />Get stuck on OhSticks
			today!
		</h2>

		<div class="--button-wrapper">
			<a
				class="submit-button"
				href={collectionAllRoute.path}
				aria-label={`Go to ${collectionAllRoute.label} page`}
			>
				{trans("component.productList.collection")}
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.feature {
		/* SIZE */
		@apply w-full h-screen;
		height: calc(100vh - (5rem + 2.5rem));
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply relative overflow-hidden;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */

		img {
			/* SIZE */
			@apply w-full h-full;
			/* MARGINS AND PADDING */
			/* LAYOUT */
			@apply object-cover;
			/* BORDERS */
			/* COLORS */
			/* TEXT */
			/* ANIMATION AND EFFECTS */
			@apply brightness-[0.5];
		}

		.--title {
			/* SIZE */
			@apply w-full sm:w-3/4 h-fit;
			/* MARGINS AND PADDING */
			@apply p-8 mb-8;
			/* LAYOUT */
			@apply absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center;
			/* BORDERS */
			/* COLORS */
			@apply text-white;
			/* TEXT */
			@apply text-center tracking-wide leading-loose;
			/* ANIMATION AND EFFECTS */

			h1 {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply mb-8;
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply font-bold text-4xl sm:text-5xl;
				/* ANIMATION AND EFFECTS */
			}

			h2 {
				/* SIZE */
				/* MARGINS AND PADDING */
				@apply mb-8;
				/* LAYOUT */
				/* BORDERS */
				/* COLORS */
				/* TEXT */
				@apply text-xl sm:text-2xl;
				/* ANIMATION AND EFFECTS */
			}
		}
	}
</style>
