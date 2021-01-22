<script>
	import ManualRule from '$components/manual/ManualRule.svelte'

	export let chapter='', ruleList=[]
</script>


<div class='manual-page page-body'>
	{#if chapter == 'Manual'}
		{#each ruleList as c}
			<div class='manual-btn'>
				<a href={`/manual/${c.name.toLowerCase()}`} class='link-btn'>{c.name}</a>
			</div>
		{/each}
	{:else if chapter == 'Gear'}
		{#each ruleList as g}
			<div class='manual-btn'>
				<a href={`/manual/gear/${g.name.toLowerCase()}`} class='link-btn'>{g.name}</a>
			</div>
		{/each}
	{:else if chapter == 'Hazards'}
		{#each ruleList as h}
			{#if h.type && h.type == 'Hazard'}
				<div class='manual-btn'>
					<ManualRule rule={h} />
				</div>
			{:else}
				<div class='manual-btn'>
					<a href={`/manual/hazards/diseases`} class='link-btn'>Diseases</a>
				</div>
			{/if}
		{/each}
	{:else if ruleList.length}
		{#each ruleList as r}
			<div class='manual-btn'>
				<ManualRule rule={r} />
			</div>
		{/each}
	{:else}
		<p>No results.</p>
	{/if}
</div>


<style>
	p {
		padding: var(--std-padding);
	}
	.manual-page {
		top: calc(var(--square) * 2);
	}
	.manual-btn {
		margin-bottom: var(--std-margin);
	}
	
</style>