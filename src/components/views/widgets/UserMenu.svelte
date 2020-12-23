<script>
	import { fade } from 'svelte/transition'
	import { menuStore } from 'stores/menuStore.js'
	import ShadowBackground from 'widgets/ShadowBackground.svelte'
</script>


<div on:click={$menuStore.toggle()}>
	{#if $menuStore.open}
		<nav class='user-menu' transition:fade>
			<a href='/character' class='link-btn'>Character</a>
			<a href='/manual' class='link-btn'>Manual</a>
			<a href='/generator' class='link-btn'>Generator</a>
		</nav>
	{/if}
	<ShadowBackground active={$menuStore.open} />
</div>


<style>
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
	a {
		border: none;
		height: calc(var(--square) * 1.5);
	}
</style>