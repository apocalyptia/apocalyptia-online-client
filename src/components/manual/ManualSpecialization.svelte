<script>
	export let rule
</script>

<div class='specialty-section'>
	{#each Object.values(rule.specialties) as specialty}
		<div class='sub-name'>
			{specialty.name}
		</div>
		{#each specialty.description as description}
			<p class='specialty-description'>
				{description}
			</p>
		{/each}
	{/each}
</div>

<style>
	.sub-name,
	.specialty-description {
		margin: var(--std-margin);
	}
	.sub-name {
		text-decoration: underline;
	}
</style>
