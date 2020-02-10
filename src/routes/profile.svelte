<script>
	import Authenticated from "./authenticated.svelte"
	import User from "../components/views/ui/User.svelte"
	import { get } from "./api/api"
	import { onMount } from "svelte"

	export let user
	export let isFollowing

	const follow = uid => {}

	onMount(async () => {
		user = await getUserProfile.then(res => {
			user = res
			console.log(user)
		})
	})
</script>


<Authenticated>
	<div>
		<h1>{user.displayName}</h1>
		<input type="checkbox" />
		{#if isFollowing}
			<button on:click={follow(user.uid)}>UnFollow</button>
		{:else}
			<button>UnFollow</button>
		{/if}
	</div>
</Authenticated>
