<script>
	import MenuItems from '/src/components/widgets/MenuItems.svelte'
	import ShadowBackground from '/src/components/widgets/ShadowBackground.svelte'
	import menuStore from '/src/stores/menuStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { fade } from 'svelte/transition'
</script>


<div on:click={() => ($menuStore = $menuStore.toggle())}>
	{#if $menuStore.open}
		<nav class="user-menu" transition:fade>
			<MenuItems links={$menuStore.links} />
			<a href={'/'} class="link-btn" on:click={() => $playerStore.userLogout()}> Log Out </a>
		</nav>
	{/if}
	<ShadowBackground active={$menuStore.open} />
</div>


<style>
	.user-menu {
		background: var(--sec-color);
		border: 1px solid var(--pri-color);
		min-width: 200px;
		padding: var(--padding);
		position: absolute;
		right: 0;
		top: calc(1px + var(--square));
		width: 50vw;
		z-index: 1000;
	}
</style>
