<script lang="ts">
	const onClick = async () => {
		await fetch("/api/test", {
			method: "POST",
			body: JSON.stringify({})
		});
	};
</script>

<div>
	<button on:click={onClick} class="submit-button">Run Trash</button>
</div>
