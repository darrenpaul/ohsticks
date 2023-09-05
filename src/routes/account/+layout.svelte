<script lang="ts">
	import AuthCheck from "$lib/components/+AuthCheck.svelte";
	import NavigationAccount from "$lib/components/navigation/+NavigationAccount.svelte";
</script>

<AuthCheck>
	<NavigationAccount />

	<slot />
</AuthCheck>
