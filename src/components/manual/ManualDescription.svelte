<script>
	import ManualSubRule from '/src/components/manual/ManualSubRule.svelte'
	import linkTerms from '/src/utils/text/linkTerms.js'
	import { onMount } from 'svelte'

	export let rule

	onMount(() => rule.description = linkTerms(rule.description))
</script>


<div class="description-section">
	{#each rule.description as description}
		<p>{@html description}</p>
	{/each}
	<!-- {#if rule.subrules.length}
		{#each rule.subrules as subrule}
			<ManualSubRule {subrule} />
		{/each}
	{/if} -->
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
