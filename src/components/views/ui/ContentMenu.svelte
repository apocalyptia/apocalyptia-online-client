<script>
export let ToC
</script>


<div class='content-menu'>
	{#each $ToC.pages as page, index}
		{#if index}
			<button on:click={$ToC.go(index)}>{page.name}</button>
		{/if}
	{/each}
</div>


<style>
.content-menu {
	height: 100%;
	padding: var(--base-unit);
}
button {
	display: block;
	margin: auto;
	margin-bottom: var(--double-unit);
	width: 80%;
}
</style>