<script>
	import RefRule from './RefRule.svelte'

	export let rules, ruleList
</script>


<div class='ref-body-section'>
	{#if rules.explanation}
		<div class='explanation'>
			{#each rules.explanation as explanation}
				<p>{explanation}</p>
			{/each}
		</div>
	{/if}
	{#if ruleList.length}
		{#each ruleList as rule}
			<RefRule {rule} />
		{/each}
	{:else}
		<div class='no-results'>
			<p>No results.</p>
		</div>
	{/if}
</div>


<style>
    .ref-body-section {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-top: var(--s100);
	}
	.no-results {
		padding-left: 10vw;
		padding-top: 2vh;
	}
</style>