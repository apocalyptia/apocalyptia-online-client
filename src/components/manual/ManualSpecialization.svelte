<script>
	export let rule
</script>


<div class="specialty-section">
	{#each Object.values(rule.specialties) as specialty}
		<h2>{specialty.name}</h2>
		{#if specialty.description}
			{#each specialty.description as description}
				<p class="specialty-description">
					{@html description}
				</p>
			{/each}
		{/if}
	{/each}
</div>


<style>
	h2,
	.specialty-description {
		margin: var(--margin);
	}
	h2 {
		font-weight: bold;
		text-decoration: underline;
	}
</style>
