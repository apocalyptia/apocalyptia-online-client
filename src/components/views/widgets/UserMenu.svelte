<script>
	import { fade } from 'svelte/transition'
	import menuStore from 'stores/menuStore.js'

	$: showMenu = $menuStore.open
</script>


<div on:click={_ => $menuStore = $menuStore.toggle()}>
	{#if showMenu}
		<nav class='user-menu' transition:fade>
			<a href='/character' class='link-btn'>Character</a>
			<a href='/manual' class='link-btn'>Manual</a>
			<a href='/generator' class='link-btn'>Generator</a>
		</nav>
	{/if}
	</div>
<div class='{showMenu ? "shadow" : "invisible"}'></div>


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
	.shadow {
		background: rgba(0, 0, 0, .66);
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		z-index: 10;
	}
	.invisible {
		display: none;
	}
</style>