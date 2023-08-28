<script lang="ts">
	import AuthCheck from "$lib/components/+AuthCheck.svelte";
	import DashboardNavigation from "$lib/components/dashboard/+DashboardNavigation.svelte";
</script>

<AuthCheck>
	<DashboardNavigation />
	<slot />
</AuthCheck>
