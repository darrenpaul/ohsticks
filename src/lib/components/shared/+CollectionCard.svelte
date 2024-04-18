<script lang="ts">
	export let image: string;
	export let url: string;
	export let ariaLabel: string;
</script>

<a class="collection-card" href={url} aria-label={ariaLabel}>
	<img class="side-by-side-image" width="auto" src={image} alt="Preview" loading="lazy" />

	<p>
		<slot />
	</p>
</a>

<style lang="postcss">
	@import "./+CollectionCard.scss";
</style>
