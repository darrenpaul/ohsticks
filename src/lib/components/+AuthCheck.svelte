<script lang="ts">
	import { user } from "$lib/firebase/firebaseClient";
</script>

{#if $user}
	<slot />
{:else}
	<p class="text-error my-10">
		You must be signed in as an admin to view this page.

		<a class="btn btn-primary" href="/login">Sign in</a>
	</p>
{/if}
