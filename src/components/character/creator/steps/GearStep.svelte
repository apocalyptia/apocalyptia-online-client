<script>
	import Creation from '/src/rules/Creation.js'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import RandomStartingGear from '/src/rules/random/RandomStartingGear.js'
	import ResetAndRandomButtonRow from '/src/components/buttons/ResetAndRandomButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { afterUpdate, beforeUpdate } from 'svelte'

	let gearedUp = false

	beforeUpdate(_ => gearedUp = Object.values($characterStore.gear).every(g => g.inventory.length))

	afterUpdate(_ => {
		Creation.proceedCheck($characterStore)
		$characterStore = $characterStore
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
			reset={''}
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