<script>
	import { locale, waitLocale, isLoading } from "svelte-i18n";

	import "../styles/app.css";
	import "../styles/global.scss";
	import { browser } from "$app/environment";
	import AuthCheck from "$lib/components/+AuthCheck.svelte";

	export const load = async () => {
		if (browser) {
			locale.set(window.navigator.language);
		}
		await waitLocale();
	};
</script>

{#if $isLoading}
	Please wait...
{:else}
	<AuthCheck>
		<slot />
	</AuthCheck>
{/if}
