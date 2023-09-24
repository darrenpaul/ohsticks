<script lang="ts">
	import Bread from "$lib/components/notification/+Bread.svelte";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type { Notification } from "$lib/types/notification";

	const notificationState: Writable<Notification[]> = getContext("notificationState");
</script>

<div class="notification">
	{#if $notificationState}
		{#each $notificationState as item, _ (item.id)}
			<Bread id={item.id} message={item.message} type={item.type} />
		{/each}
	{/if}
</div>

<style lang="postcss">
	.notification {
		/* SIZE */
		/* MARGINS AND PADDING */
		/* LAYOUT */
		@apply fixed flex flex-col bottom-0 left-0 z-notification justify-center items-center;
		/* BORDERS */
		/* COLORS */
		/* TEXT */
		/* ANIMATION AND EFFECTS */
		@apply cursor-pointer;
	}
</style>
