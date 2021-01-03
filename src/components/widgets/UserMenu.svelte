<script>
	import { fade } from 'svelte/transition'
	import { menuStore } from 'stores/menuStore.js'
	import ShadowBackground from 'components/widgets/ShadowBackground.svelte'
</script>


<div on:click={_ => $menuStore = $menuStore.toggle()}>
	{#if $menuStore.open}
		<nav class='user-menu' transition:fade>
			{#each $menuStore.links as link}
				<a href={link.url} class='link-btn'>{link.name}</a>
			{/each}
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