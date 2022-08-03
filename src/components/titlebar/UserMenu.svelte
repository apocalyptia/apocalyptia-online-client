<script>
	import MenuItems from '$components/widgets/MenuItems.svelte'
	import ShadowBackground from '$components/widgets/ShadowBackground.svelte'
	import menuStore from '$stores/menuStore.js'
	import playerStore from '$stores/playerStore.js'
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
		border: var(--solid-border);
		min-width: 200px;
		padding: var(--padding);
		position: absolute;
		right: 0;
		top: calc(1px + var(--square));
		width: 50vw;
		z-index: 1000;
	}
	a {
		text-decoration: none;
	}
</style>
