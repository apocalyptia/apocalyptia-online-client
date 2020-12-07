<script>
	import ButtonRow from 'views/character/creator/ButtonRow.svelte'
	import GearBlock from 'views/widgets/GearBlock.svelte'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import RandomStartingGear from 'random/RandomStartingGear.js'
	import { character } from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	export let creator

	let gearedUp = false

	const randomGear = _ => {
		$character = RandomStartingGear($character, $character.properties.luck.score)
	}

	beforeUpdate(_ => {
		gearedUp = Object.values($character.gear).every(g => g.inventory.length)
	})
</script>


<PageHeader {creator} step={$character.meta.step} />
<div class='explanation'>
	<p>You start with some random Gear:</p>
	<p>One piece of Armor</p>
	<p>One Melee weapon</p>
	<p>One Ranged weapon</p>
	<p>1d6 rounds of Ammo</p>
	<p>Random items = Luck</p>
</div>
{#if gearedUp}
	{#each Object.values($character.gear) as category (category.name)}
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
	<ButtonRow random={_ => randomGear()} />
{/if}


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