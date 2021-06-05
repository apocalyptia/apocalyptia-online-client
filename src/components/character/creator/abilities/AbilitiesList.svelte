<script>
	import abilitiesStore from '/src/stores/abilitiesStore.js'
	import characterStore from '/src/stores/characterStore.js'

	function updateAbilities(ability) {
		$characterStore.updateAbilities(ability)
		$characterStore = $characterStore
	}

	function filterList() {
		if (filterCost) {
			visibleList = $abilitiesStore.list.filter((a) => a.experience === filterCost)
		} else {
			visibleList = $abilitiesStore.list
		}
	}

	$: filterCost = 0

	let visibleList = $abilitiesStore.list
</script>

<div class='organizer-bar'>
	<span class='xp-filter'>
		XP Cost:
		<!-- svelte-ignore a11y-no-onchange -->
		<select class='xp-cost-selector' bind:value={filterCost} on:change={filterList}>
			<option value={0}>-</option>
			{#each $abilitiesStore.xpCosts as xpCost}
				<option value={xpCost}>{xpCost}</option>
			{/each}
		</select>
	</span>
	<span class='taken-header'>Taken</span>
</div>
<div class='abilities-list'>
	{#each visibleList as ability}
		<div class='ability-list-item'>
			<details class='ability-card'>
				<summary class='ability-titlebar'>
					<h4 class='ability-title'>{ability.name}</h4>
					<span class='ability-controls'>
						<!-- svelte-ignore a11y-no-onchange -->
						<select
							name={ability.name}
							bind:value={ability.quantity}
							on:change={() => updateAbilities(ability)}
							disabled={ability.experience > $characterStore.properties.experience.current}
						>
							{#each Array(ability.max + 1) as _, takenNum}
								<option value={takenNum} selected={takenNum === ability.quantity}>
									{takenNum}
								</option>
							{/each}
						</select>
					</span>
				</summary>
				<div class='ability-description'>
					{#if ability.options.length}
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
					{#each ability.description as description}
						<p>{description}</p>
					{/each}
					<hr />
					<p class='ability-footer'>
						<span class='ability-experience'>
							Cost: {ability.experience} XP
						</span>
						<span class='ability-max'>
							Max: {ability.max}
						</span>
					</p>
				</div>
			</details>
		</div>
	{/each}
</div>

<style>
	.organizer-bar {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
	.taken-header {
		font-weight: bold;
		text-align: center;
	}
	.skill-options-selector {
		margin-bottom: var(--std-margin);
		width: 100%;
	}
	.abilities-list,
	.ability-card {
		width: 100%;
	}
	.ability-list-item {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: var(--std-margin) 0;
	}
	.ability-titlebar {
		display: flex;
		justify-content: space-between;
		padding: var(--std-padding);
	}
	.taken-header {
		padding-right: calc(var(--std-padding) / 2);
	}
	.ability-controls {
		align-items: center;
		display: flex;
		justify-content: space-around;
	}
	.ability-description {
		padding: var(--std-padding);
	}
	.ability-footer {
		display: flex;
		font-weight: bold;
		justify-content: space-between;
		text-align: right;
		width: 100%;
	}
</style>
