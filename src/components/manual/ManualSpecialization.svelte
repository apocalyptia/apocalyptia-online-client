<script>
	import linkTerms from '/src/utils/text/linkTerms.js'

	export let rule
</script>


<div class="specialty-section">
	{#each Object.values(rule.specialties) as specialty}
		<div class="sub-name">
			{specialty.name}
		</div>
		{#if specialty.description}
			{#each linkTerms(specialty.description) as description}
				<p class="specialty-description">
					s{@html description}
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
		text-decoration: underline;
	}
</style>
