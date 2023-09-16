<script lang="ts">
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import { trans } from "$lib/locales/translateCopy";
</script>

<div class="feature">
	<img
		height="100dvh"
		src="https://firebasestorage.googleapis.com/v0/b/ohsticks-37fa7.appspot.com/o/page%2Fohsticks-homepage-feature.webp?alt=media&token=e77db1a2-582e-4ffe-abb1-714cf0cd149b"
		alt="wall full of stickers from OhSticks"
		loading="eager"
		on:load={() => {
			console.log("loaded");
		}}
	/>

	<div class="--title">
		<h1>Stick it to the man with OhSticks</h1>

		<h2>
			Make your mark and show off your style with our trendy decals. Get stuck on OhSticks today!
		</h2>

		<div class="--button-wrapper">
			<a href={collectionAllRoute.path}>
				<ButtonIcon>
					{trans("component.productList.collection")}
				</ButtonIcon>
			</a>
		</div>
	</div>
</div>

<style lang="scss">
	.feature {
		/* SIZE */
		@apply w-full h-[100dvh];
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
			@apply absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center justify-center;
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
