<script>
	import MainMenu from 'components/landing/MainMenu.svelte'
	import UserLogin from 'components/landing/UserLogin.svelte'
	// import { onMount } from 'svelte'
	import { playerStore } from 'stores/playerStore.js'
	
	let userBase

	// onMount(async _ => {
	// 	userBase = await fetch('https://sdk.userbase.com/2/userbase.js').then(thing => {
	// 		console.log('thing = ', thing)
	// 	})
		// userBase.init({ appId: $playerStore.appId })
	// })
</script>


<!-- {#if $playerStore.loggedIn } -->
	<MainMenu />
<!-- {:else}
	<UserLogin />
{/if} -->