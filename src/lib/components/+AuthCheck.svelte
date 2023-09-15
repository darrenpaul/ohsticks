<script lang="ts">
	import { user } from "$lib/firebase/firebaseClient";
	import { trans } from "$lib/locales/translateCopy";
	import ButtonIcon from "$lib/components/icons/+ButtonIcon.svelte";
	import BrandPortraitIcon from "./icons/+BrandPortraitIcon.svelte";
</script>

{#if $user}
	<slot />
{:else}
	<div class="authentication-needed-page">
		<BrandPortraitIcon />

		<h2>{trans("component.authCheck.loginRequired.label")}</h2>

		<a class="btn btn-primary" href="/login">
			<ButtonIcon>
				{trans("component.authCheck.login.label")}
			</ButtonIcon>
		</a>
	</div>
{/if}

<style lang="scss">
	.authentication-needed-page {
		/* SIZE */
		@apply w-screen h-screen;
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply flex flex-col justify-center items-center gap-8;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
	}
</style>
