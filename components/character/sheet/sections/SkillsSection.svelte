<script>
	import characterStore from '/src/stores/characterStore.js'

	export const mode = 'readonly'
</script>


<div class='sheet-card-body'>
	{#each Object.values($characterStore.traits) as trait}
		<div class='sheet-card-block'>
			<div class='parent-trait'>
				{trait.name}
			</div>
			{#each Object.values($characterStore.skills) as skill}
				{#if trait.name === skill.parent}
					<div class='sheet-card-item'>
						{skill.name}: {skill.score}
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>


<style>
	.sheet-card-block {
		border: 1px dotted var(--pri-color);
		width: 100%;
	}
	.parent-trait {
		font-size: var(--s110);
		font-weight: bold;
		margin: var(--std-margin);
		text-align: center;
	}
</style>