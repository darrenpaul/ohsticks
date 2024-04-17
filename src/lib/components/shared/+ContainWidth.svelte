<script lang="ts">
	export let background = "bg-neutral-100";
	export let padding = "p-0";
</script>

<div class={`contain-width ${background} ${padding}`}>
	<div class="inner">
		<slot />
	</div>
</div>

<style lang="scss">
	@import "./+ContainWidth.scss";
</style>
