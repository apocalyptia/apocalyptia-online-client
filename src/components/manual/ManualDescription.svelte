<script>
	export let rule
</script>

<div class='desc-section'>
	{#each rule.desc as desc}
		<p>{desc}</p>
	{/each}
	{#if rule.type === 'Ability'}
		<p><span class='bold'>Max:</span> {rule.max}</p>
		<p><span class='bold'>XP:</span> {rule.experience}</p>
	{/if}
</div>

<style>
	p {
		margin: var(--std-margin);
	}
	.bold {
		font-weight: bold;
	}
</style>
