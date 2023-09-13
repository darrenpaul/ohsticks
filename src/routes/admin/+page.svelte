<script lang="ts">
	import { user } from "$lib/firebase/firebaseClient";
	import { error } from "@sveltejs/kit";

	const onRunMigration = async () => {
		console.log("running migration");
		const accessToken = await $user?.getIdToken();
		if (!accessToken) {
			return error(401, "Unauthorized");
		}

		await fetch("/api/admin/migrate", {
			method: "PUT",
			headers: {
				"x-access-token": accessToken
			}
		});
	};
</script>

<h1>Admin Dashboard</h1>

<button class="submit-button" on:click={onRunMigration}>Run Migration</button>
