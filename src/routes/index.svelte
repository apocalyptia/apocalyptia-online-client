<script>
	import MainMenu from 'components/landing/MainMenu.svelte'
	import UserLogin from 'components/landing/UserLogin.svelte'
	import playerStore from 'stores/playerStore.js'
</script>


<!-- {#if $playerStore.loggedIn } -->
	<MainMenu />
<!-- {:else}
	<UserLogin />
{/if} -->