<script>
	export let ToC
</script>


<div class='menu-page'>
	{#each $ToC.chapters as chapter, index}
		<button
			class='display-button'
			on:click={$ToC.go(index)}
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