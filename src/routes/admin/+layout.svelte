<script lang="ts">
	import AuthAdminCheck from "$lib/components/+AuthAdminCheck.svelte";
	import AdminNavigation from "$lib/components/navigation/+AdminNavigation.svelte";
</script>

<!-- <AuthAdminCheck> -->
<AdminNavigation />
<slot />
<!-- </AuthAdminCheck> -->
