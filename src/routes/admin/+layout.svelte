<script lang="ts">
	import AuthAdminCheck from "$lib/components/+AuthAdminCheck.svelte";
	import AdminNavigation from "$lib/components/navigation/+AdminNavigation.svelte";
	import { user } from "$lib/firebase/firebaseClient";

	$user;
</script>

<AuthAdminCheck>
	<AdminNavigation />
	<slot />
</AuthAdminCheck>
