<script>
	// import LogOut from '/src/utils/auth/LogOut.js'
	import MenuItems from '/src/components/widgets/MenuItems.svelte'
	import ShadowBackground from '/src/components/widgets/ShadowBackground.svelte'
	import menuStore from '/src/stores/menuStore.js'
	// import playerStore from '/src/stores/playerStore.js'
	import { fade } from 'svelte/transition'

	// const logOut = () => $playerStore = LogOut()
</script>

<div on:click={() => ($menuStore = $menuStore.toggle())}>
	{#if $menuStore.open}
		<nav class='user-menu' transition:fade>
			<MenuItems links={$menuStore.links} />
			<!-- <a href={'/'} class='link-btn borderless' on:click={logOut}>
				Log Out
			</a> -->
		</nav>
	{/if}
	<ShadowBackground active={$menuStore.open} />
</div>

<style>
	.user-menu {
		background: var(--sec-color);
		border: 1px solid var(--pri-color);
		padding: var(--std-padding);
		position: absolute;
		right: 0;
		top: calc(1px + var(--square));
		width: 50vw;
		min-width: 200px;
		z-index: 1000;
	}
</style>
