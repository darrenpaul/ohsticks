<script lang="ts">
	import { _ as trans } from "svelte-i18n";
	import FeatureCarousel from "$lib/components/shared/+FeatureCarousel.svelte";
	import ProductList from "$lib/components/shared/+ProductList.svelte";
	import SideBySideImage from "$lib/components/shared/+SideBySideImage.svelte";
	import ContainWidth from "$lib/components/shared/+ContainWidth.svelte";

	export let data;
	console.log("data:", data);
</script>

<div class="home-page">
	<ContainWidth background="bg-transparent">
		<FeatureCarousel />

		<ProductList
			title={$trans("page.home.popularProducts")}
			products={data.body.pageData.featureCarousel}
		/>

		<SideBySideImage />
	</ContainWidth>
</div>

<style lang="scss">
	.home-page {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply grid items-center justify-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
