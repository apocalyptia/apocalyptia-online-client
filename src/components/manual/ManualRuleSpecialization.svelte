<script>
    export let rule
</script>


<div class='spec-section'>
	{#each Object.values(rule.specs) as spec}
		<div class='sub-name'>
			{spec.name}
		</div>
		{#each spec.desc as desc}
			<p class='spec-desc'>
				{desc}
			</p>
		{/each}
	{/each}
</div>


<style>
	.sub-name,
    .spec-desc {
		margin: var(--std-margin);
	}
	.sub-name {
		text-decoration: underline;
	}
</style>