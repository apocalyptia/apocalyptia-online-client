<script>
	import { fade } from 'svelte/transition'
	import { refToC } from '../../../stores'
</script>

<div class='menu-page' in:fade>
	{#each $refToC.chapters as chapter, index}
		<button
			class='display-button'
			on:click={$refToC.go(index)}
		>
			{chapter}
		</button>
	{/each}
</div>

<style>
	.menu-page {
		margin-bottom: calc(3rem + 5vh);
	}
</style>