<script>
	import "../styles/app.css";
	import "../styles/global.scss";
	import { locale, waitLocale, isLoading } from "svelte-i18n";
	import { browser } from "$app/environment";
	import GoogleTagManager from "$lib/components/+GoogleTagManager.svelte";

	export const load = async () => {
		if (browser) {
			locale.set(window.navigator.language);
		}
		await waitLocale();
	};
</script>

<GoogleTagManager />

{#if $isLoading}
	Please wait...
{:else}
	<slot />
{/if}
