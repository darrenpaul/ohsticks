<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { Writable } from "svelte/store";

	export let id: string;
	export let message: string;
	export let type: string;
	export let duration = 5;

	const notificationState: Writable<Notification[]> = getContext("notificationState");

	let durationLeft = duration;
	let timer;

	const onNotificationClick = () => {
		onTimerFinish();
		clearInterval(timer);
	};

	const onTimerFinish = () => {
		const removedLastNotification = $notificationState.filter((lol) => lol.id !== id);
		notificationState.set(removedLastNotification);
	};

	const createTimer = () => {
		timer = setInterval(() => {
			durationLeft++;
			if (durationLeft >= duration) {
				onTimerFinish();
				clearInterval(timer);
			}
		}, 1000);
	};

	onMount(() => {
		clearInterval(timer);
		durationLeft = 0;
		createTimer();
	});
</script>

<div
	class={`bread ${type}`}
	on:click={onNotificationClick}
	on:keydown={onNotificationClick}
	tabindex="0"
	role="button"
>
	<p class="notification-message">{message}</p>
</div>

<style lang="postcss">
	.bread {
		/* SIZE */
		@apply w-screen;
		/* MARGINS AND PADDING */
		@apply py-3 px-6;
		/* LAYOUT */
		@apply flex items-center justify-center;
		/* BORDERS */
		/* COLORS */
		@apply text-white;
		/* TEXT */
		@apply font-bold;
		/* ANIMATION AND EFFECTS */

		&.success {
			@apply bg-green-500;
		}

		&.warn {
			@apply bg-yellow-500;
		}

		&.error {
			@apply bg-red-500;
		}
	}
</style>
