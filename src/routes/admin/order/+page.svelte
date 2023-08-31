<script lang="ts">
	import { user } from "$lib/firebase/firebaseClient";
	import { adminOrderRoute } from "$lib/constants/routes/admin/adminOrderRoute";
	import firebaseAuthenticateRole from "$lib/firebase/firebaseAuthenticateRole";
	import { error } from "@sveltejs/kit";
	import { onMount } from "svelte";
	import { adminRole } from "$lib/constants/roles";

	onMount(async () => {
		const accessToken = await $user?.getIdToken();

		if (!accessToken) {
			return error(401, "Unauthorized");
		}
		const { role } = await firebaseAuthenticateRole(accessToken);

		if (!role || role !== adminRole) {
			return error(401, "Unauthorized");
		}

		const response = await fetch("/api/order", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": accessToken
			}
		});

		data = await response.json();
	});

	export let data;
</script>

<a href={adminOrderRoute.path}>Create Order</a>

<h2>Orders</h2>

<p>{JSON.stringify(data)}</p>
