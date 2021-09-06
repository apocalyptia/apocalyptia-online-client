<script>
	export let rule
</script>


<div class="specialty-section">
	{#each Object.values(rule.specialties) as specialty}
		<div class="sub-name">
			{specialty.name}
		</div>
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
	.sub-name,
	.specialty-description {
		margin: var(--margin);
	}
	.sub-name {
		font-weight: bold;
		text-decoration: underline;
	}
</style>
