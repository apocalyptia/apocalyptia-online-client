<script>
export let ToC
</script>


<div class='menu-screen'>
	{#each $ToC.chapters as chapter, index}
		<button on:click={$ToC.go(index)}>
			{chapter}
		</button>
	{/each}
</div>


<style>
button {
	margin-bottom: var(--base-unit);
	width: 100%;
}
</style>