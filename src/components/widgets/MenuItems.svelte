<script>
	import menuStore from '/src/stores/menuStore.js'

	export let borders
</script>

{#each $menuStore.links as link}
	<a href={link.url} class="link-btn {borders ? '' : 'borderless'}">
		{link.name}
	</a>
{/each}

<style>
	.borderless {
		border: none;
		height: calc(var(--square) * 1.5);
	}
</style>
