<script>
	import MenuButton from '/src/components/titlebar/MenuButton.svelte'
	import UserMenu from '/src/components/titlebar/UserMenu.svelte'
	// import playerStore from '/src/stores/playerStore.js'
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
