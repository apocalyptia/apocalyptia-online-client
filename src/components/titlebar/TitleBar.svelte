<script>
	import MenuButton from '$components/titlebar/MenuButton.svelte'
	import UserMenu from '$components/titlebar/UserMenu.svelte'
	// import playerStore from '$stores/playerStore.js'
</script>


<a href="/" class="link-btn">
	<h1>Apocalyptia Online</h1>
</a>
<!-- {#if $playerStore.loggedIn} -->
<MenuButton />
<UserMenu />
<!-- {/if} -->


<style>
	a {
		display: block;
		padding: var(--padding);
		width: 100%;
	}
</style>
