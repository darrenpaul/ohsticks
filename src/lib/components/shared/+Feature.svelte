<script lang="ts">
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import { collectionAllRoute } from "$lib/constants/routes/collectionRoute";
	import { trans } from "$lib/locales/translateCopy";
</script>

<div class="feature">
	<div class="image-container">
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
	</div>

	<div class="content-container">
		<h1>Stick it to the man with OhSticks</h1>

		<p>
			Make your mark and show off your style with our trendy decals.<br />Get stuck on OhSticks
			today!
		</p>

		<a
			class="button"
			href={collectionAllRoute.path}
			aria-label={`Go to ${collectionAllRoute.label} page`}
		>
			{trans("component.productList.collection")}
		</a>
	</div>
</div>

<style lang="postcss">
	@import "./+Feature.scss";
</style>
