<script lang="ts">
	import AuthAdminCheck from "$lib/components/+AuthAdminCheck.svelte";
	import AdminNavigation from "$lib/components/navigation/+AdminNavigation.svelte";
	import { user } from "$lib/firebase/firebaseClient";
	import { browser } from "$app/environment";
	import "$lib/i18n"; // Import to initialize. Important :)
	import { locale, waitLocale } from "svelte-i18n";

	export const load = async () => {
		if (browser) {
			locale.set(window.navigator.language);
		}
		await waitLocale();
	};

	$user;
</script>

<AuthAdminCheck>
	<AdminNavigation />
	<slot />
</AuthAdminCheck>
