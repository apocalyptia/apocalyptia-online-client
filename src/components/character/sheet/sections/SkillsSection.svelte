<script>
	import characterStore from '/src/stores/characterStore.js'

	export const mode = 'readonly'
</script>

<div class="sheet-card-body">
	{#each Object.values($characterStore.traits) as trait}
		<div class="sheet-card-block">
			<div class="parent-trait">
				<h3>{trait.name}</h3>
			</div>
			<div class="skill-row">
				{#each Object.values($characterStore.skills) as skill}
					{#if trait.name === skill.parent}
						<div class="sheet-card-item">
							<h4>{skill.name}:</h4>
							{skill.score}
						</div>
					{/if}
				{/each}
			</div>
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
	.skill-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.sheet-card-item {
		display: inline-block;
	}
</style>
