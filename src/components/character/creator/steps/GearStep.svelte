<script>
	import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'
	import Creation from 'rules/Creation.js'
	import GearBlock from 'components/widgets/GearBlock.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import RandomStartingGear from 'rules/random/RandomStartingGear.js'
	import ResetAndRandomButtonRow from 'components/buttons/ResetAndRandomButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'
	import { afterUpdate, beforeUpdate } from 'svelte'

	console.log('Gear Step Abilities List')
	console.log(AbilitiesList.masterList.filter(a => a.taken))

	let gearedUp = false

	beforeUpdate(_ => gearedUp = Object.values($characterStore.gear).every(g => g.inventory.length))

	afterUpdate(_ => {
		Creation.proceedCheck($characterStore)
		$characterStore = $characterStore
		SaveCharacter()
	})
</script>


<div class='gear-step-page'>
	<PageHeader chapter={'Gear'} step={$characterStore.meta.step} />
	<div class='explanation'>
		{#each Creation.startingGearExplanation as gearLine}
			<p>{gearLine}</p>
		{/each}
	</div>
	{#if gearedUp}
		{#each Object.values($characterStore.gear) as category (category.name)}
			<details>
				<summary>{category.name}</summary>
				<div class='details-content'>
					{#if category.name == 'Equipment'}
						{#each category.inventory as equipment (equipment.name)}
							<div class='item'>
								<GearBlock item={equipment} mode={'readonly'} />
							</div>
						{/each}
					{:else}
						<div class='item'>
							<GearBlock item={category.inventory[0]} mode={'readonly'} />
						</div>
					{/if}
				</div>
			</details>
		{/each}
	{:else}
		<ResetAndRandomButtonRow
			reset={_ => $characterStore = $characterStore.resetGear()}
			random={_ => $characterStore = RandomStartingGear($characterStore, $characterStore.properties.luck.score)} />
	{/if}
</div>


<style>
	details {
		margin: var(--std-margin);
	}
	.details-content {
		display: block;
	}
	.item {
		padding: var(--std-padding);
	}
</style>