<script>
	import MainMenu from '$components/landing/MainMenu.svelte'
	// import userbase from 'userbase-js-node'
	// import UserLogin from '$components/landing/UserLogin.svelte'
	// import playerStore from '$stores/playerStore.js'
	// import { onMount } from 'svelte'

	// onMount(async _ => {
	// 	await userbase.init({
	// 		appId: '1a86b92f-6b82-413c-9a31-2615a80bd4f8',
	// 		allowServerSideEncryption: true
	// 	})
	// 	.then(session => console.log(`Session: ${session}`))
	// 	.catch(err => console.error(`Error: ${err}`))
	// })
</script>


<!-- {#if $playerStore.loggedIn } -->
	<MainMenu />
<!-- {:else}
	<UserLogin />
{/if} -->