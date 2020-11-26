<script>
    import ManualRule from 'views/manual/ManualRule.svelte'

    export let ruleList
</script>


<div class='manual-page-body'>
	{#if ruleList.length}
		<div class='rule-body-section'>
			{#each ruleList as rule}
				<ManualRule {rule} />
			{/each}
		</div>
	{:else}
		<div class='no-results'>
			<p>No results.</p>
		</div>
	{/if}
</div>


<style>
    .rule-body-section {
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .no-results {
        padding: var(--square);
    }
</style>