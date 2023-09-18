<script lang="ts">
	const onRunMigration = async () => {
		console.log("running migration");

		await fetch("/api/admin/migrate", {
			method: "PUT"
		});
	};
</script>

<h1>Admin Dashboard</h1>

<button class="submit-button" on:click={onRunMigration}>Run Migration</button>
