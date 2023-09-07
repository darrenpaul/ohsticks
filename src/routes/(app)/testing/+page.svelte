<script lang="ts">
	import { getImageMeta } from "$lib/utils/imageProcessing";

	const handleForgotPassword = async () => {
		const imageUrl =
			"https://firebasestorage.googleapis.com/v0/b/ohsticks-37fa7.appspot.com/o/product%2Fsteam-punk-pumpkin-sticker%2Fsteam-punk-pumpkin-sticker-vuxwf.jpeg?alt=media&token=7bc908cb-64e1-4cf5-9f82-d4bf07cb299d";
		const apples = await getImageMeta(imageUrl);
		console.log("handleForgotPassword ~ apples:", apples);
	};
</script>

<div class="login-page">
	<button class="link-button" on:click={handleForgotPassword}>TEST</button>
</div>

<style lang="scss">
	.login-page {
		/* SIZE */
		@apply w-[400px];
		/* MARGINS AND PADDING */
		@apply mt-16 mx-auto;
		/* LAYOUT */
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
