<script>
	import characterStore from '/src/stores/characterStore.js'

	function updateAbilities(ability) {
		$characterStore.updateAbilities(ability)
		$characterStore = $characterStore
	}
</script>

<div class='current-abilities'>
	<div class='current-abilities-title'>Current Abilities</div>
	<div class='current-abilities-section'>
		<div class='current-abilities-header'>
			<span class='l-col'>Name</span>
			<span class='s-col'>XP</span>
			<span class='s-col'>Max</span>
			<span class='s-col'>Taken</span>
		</div>
		<div class='current-abilities-list'>
			{#each $characterStore.abilities as ability}
				<div class='current-ability-row'>
					<span class='l-col'>
						{ability.name}{#if ability.options && ability.options.length}:
							<br />
							<!-- svelte-ignore a11y-no-onchange -->
							<select
								name='skill-options'
								class='skill-options-selector'
								bind:value={ability.selection}
								on:change={() => updateAbilities(ability)}
							>
								{#each ability.options as optionName, selectionNum}
									<option value={selectionNum} selected={selectionNum === ability.selection}>
										{optionName}
									</option>
								{/each}
							</select>
						{/if}
					</span>
					<span class='s-col'>{ability.experience}</span>
					<span class='s-col'>{ability.max}</span>
					<span class='s-col'>
						<!-- svelte-ignore a11y-no-onchange -->
						<select class='taken-number' bind:value={ability.qty} on:change={() => updateAbilities(ability)}>
							{#each Array(ability.max + 1) as _, takenNum}
								<option value={takenNum} selected={takenNum === ability.qty}>
									{takenNum}
								</option>
							{/each}
						</select>
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.current-abilities {
		width: 100%;
	}
	.current-abilities-title {
		font-size: var(--s125);
		font-weight: bold;
		text-align: center;
		text-decoration: underline;
		width: 100%;
	}
	.current-abilities-header,
	.current-ability-row {
		align-items: baseline;
		display: flex;
		justify-content: space-between;
		margin: var(--std-margin) 0;
	}
	.current-abilities-header {
		font-weight: bold;
		text-decoration: underline;
	}
	.l-col {
		flex: 3;
	}
	.s-col {
		flex: 1;
		text-align: center;
	}
	.skill-options-selector {
		width: 100%;
	}
</style>
