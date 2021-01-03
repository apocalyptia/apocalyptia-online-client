<script>
	import ResetAndRandomButtonRow from 'components/character/creator/ResetAndRandomButtonRow.svelte'
	import GearBlock from 'components/widgets/GearBlock.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import RandomStartingGear from 'rules/random/RandomStartingGear.js'
	import { characterStore } from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	let gearedUp = false

	const startingGearExplanation = [
		`You start with some random Gear:`,
		`One piece of Armor`,
		`One Melee weapon`,
		`One Ranged weapon`,
		`1d6 rounds of Ammo`,
		`Random items = Luck`,
	]

	const randomGear = _ => {
		$characterStore = RandomStartingGear($characterStore, $characterStore.properties.luck.score)
	}

	beforeUpdate(_ => {
		gearedUp = Object.values($characterStore.gear).every(g => g.inventory.length)
	})
</script>


<div class='gear-step-page'>
	<PageHeader chapter={'Gear'} step={$characterStore.meta.step} />
	<div class='explanation'>
		{#each startingGearExplanation as gearLine}
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
								<GearBlock item={equipment} mode={'edit'} />
							</div>
						{/each}
					{:else}
						<div class='item'>
							<GearBlock item={category.inventory[0]} mode={'edit'} />
						</div>
					{/if}
				</div>
			</details>
		{/each}
	{:else}
		<ResetAndRandomButtonRow random={_ => randomGear()} />
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