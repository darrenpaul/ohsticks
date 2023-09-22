<script lang="ts">
	const test = async () => {
		await fetch("/api/test", { method: "POST" });
	};
</script>

<button on:click={test} class=" mt-40 submit-button">Test</button>
