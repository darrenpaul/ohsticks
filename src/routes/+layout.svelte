<script>
	import "../styles/app.css";
	import "../styles/global.scss";
	import GoogleTagManager from "$lib/components/+GoogleTagManager.svelte";
	import { browser } from "$app/environment";
</script>

<GoogleTagManager />

<slot />
