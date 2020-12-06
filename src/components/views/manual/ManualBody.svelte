<script>
	import ManualRule from 'views/manual/ManualRule.svelte'

	export let chapter, ruleList
</script>


<div class='manual-body'>
	{#if chapter == 'Manual'}
		{#each ruleList as c}
			<div>
				<a href={`/manual/${c.name.toLowerCase()}`} class='link-btn'>
					{c.name}
				</a>
			</div>
		{/each}
	{:else if ruleList.length}
		{#each ruleList as rule}
			<ManualRule {rule} />
		{/each}
	{:else}
		<p>No results.</p>
	{/if}
</div>


<style>
	p {
		padding: var(--std-padding);
	}
	.manual-body {
		padding-bottom: calc(var(--square) + var(--std-padding));
	}
</style>