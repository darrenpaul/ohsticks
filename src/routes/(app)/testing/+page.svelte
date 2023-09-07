<script lang="ts">
	const handleForgotPassword = async () => {
		const response = await fetch("/api/admin/test-mail", {
			method: "POST"
		});
		console.log("handleForgotPassword ~ response:", response);
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
