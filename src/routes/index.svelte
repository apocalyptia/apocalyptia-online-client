<script>
	// import UserLogin from '/src/components/home/UserLogin.svelte'
	// import playerStore from '/src/stores/playerStore.js'
	import MainMenu from '/src/components/home/MainMenu.svelte'
</script>

<!-- {#if $playerStore.loggedIn} -->
<MainMenu />
<!-- {:else}
	<UserLogin />
{/if} -->
