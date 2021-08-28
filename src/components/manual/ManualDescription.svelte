<script>
	import ManualSubRule from '/src/components/manual/ManualSubRule.svelte'

	export let rule
</script>


<div class="description-section">
	{#each rule.description as description}
		<p>{description}</p>
	{/each}
	{#if rule.subrules.length}
		{#each rule.subrules as subrule}
			<ManualSubRule {subrule} />
		{/each}
	{/if}
	{#if rule.type === 'Ability'}
		<p><span class="bold">Max:</span> {rule.max}</p>
		<p><span class="bold">XP:</span> {rule.experience}</p>
	{/if}
</div>


<style>
	p {
		margin: var(--margin);
	}
	.bold {
		font-weight: bold;
	}
</style>
