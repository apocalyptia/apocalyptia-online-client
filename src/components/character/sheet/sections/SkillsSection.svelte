<script>
	import characterStore from '/src/stores/characterStore.js'

	export let mode

	function updateSkill(skill) {
		$characterStore = $characterStore.updateSkill(skill)
		if (mode !== 'readonly') {
			$characterStore = $characterStore.creationCanProceed()
		}
	}

	const skillGroups = Object.values($characterStore.traits).map((t) => {
		return {
			name: t.name,
			list: Object.values($characterStore.skills).filter((s) => s.parent === t.name),
			max: t.score,
			open: false
		}
	})
</script>


{#if mode === 'readonly'}
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
{:else}
	{#each skillGroups as group}
		<div class="item-block">
			<details class="skills-details" bind:open={group.open}>
				<summary>
					<span>{group.open ? '-' : '+'}</span>
					<h2>{group.name} Skills</h2>
				</summary>
				<div class="details-content">
					<div class="max-score">
						Max Score: {group.max}
					</div>
					{#each group.list as skill}
						<div class="skill-row">
							<h3>{skill.name}</h3>
							<input type='number'
								min=0 max={$characterStore.meta.maxTraits}
								bind:value={$characterStore.skills[skill.name.toLowerCase()].score}
								on:change={() => updateSkill(skill)}
							/>
						</div>
					{/each}
				</div>
			</details>
		</div>
	{/each}
{/if}


<style>
	.sheet-card-block {
		border: var(--dotted-border);
		width: 100%;
	}
	.parent-trait {
		font-size: var(--s110);
		font-weight: bold;
		margin: var(--margin);
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
	.item-block {
		margin: var(--margin) 0;
	}
	span {
		margin-right: var(--margin);
	}
	.max-score {
		font-weight: bold;
		margin-top: var(--margin);
		text-align: center;
	}
	.skill-row {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: var(--padding);
	}
</style>
