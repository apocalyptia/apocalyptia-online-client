<script>
	// import LogOut from '/src/utils/auth/LogOut.js'
	import MenuItems from '/src/components/widgets/MenuItems.svelte'
	import ShadowBackground from '/src/components/widgets/ShadowBackground.svelte'
	import menuStore from '/src/stores/menuStore.js'
	// import playerStore from '/src/stores/playerStore.js'
	import { fade } from 'svelte/transition'

	// const logOut = _ => $playerStore = LogOut()
</script>


<div on:click={_ => $menuStore = $menuStore.toggle()}>
	{#if $menuStore.open}
		<nav class='user-menu' transition:fade>
			<MenuItems borders={false} />
			<!-- <a href={'/'} class='link-btn borderless' on:click={logOut}>
				Log Out
			</a> -->
		</nav>
	{/if}
	<ShadowBackground active={$menuStore.open} />
</div>


<style>
	/* .borderless {
		border: none;
		height: calc(var(--square) * 1.5);
	} */
	.user-menu {
		background: var(--sec-color);
		border: 1px solid var(--pri-color);
		position: absolute;
		right: 0;
		top: calc(1px + var(--square));
		width: 50vw;
		min-width: 200px;
		z-index: 1000;
	}
</style>