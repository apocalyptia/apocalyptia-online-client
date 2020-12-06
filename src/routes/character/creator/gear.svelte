<script>
	import ButtonRow from 'views/character/creator/ButtonRow.svelte'
	import Capitalize from 'utils/Capitalize.js'
	import GearBlock from 'views/widgets/GearBlock.svelte'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import RandomStartingGear from 'random/RandomStartingGear.js'
	import { character } from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	export let creator

	let gearedUp = false

	beforeUpdate(_ => gearedUp = Object.values($character.gear).every(g => g.inventory.length))
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
	{#each Object.keys($character.gear) as type, key}
		<details class='item-details'>
			<summary>
				<span class='item-label'>
					{Capitalize(type)}
				</span>
			<summary>
			<div class='details-content'>
				{#if type == 'equipment'}
					{#each $character.gear.equipment.inventory as equipment}
						<div class='item'>
							<GearBlock item={equipment} mode={'edit'} />
						</div>
					{/each}
				{:else}
					<div class='item'>
						<GearBlock item={$character.gear[type].inventory[0]} mode={'edit'} />
					</div>
				{/if}
			</div>
		</details>
	{/each}
{:else}
	<ButtonRow random={_ => $character = RandomStartingGear($character, $character.properties.luck.score)} />
{/if}


<style>
	.item-details {
		margin: var(--std-margin);
	}
	.item-label {
		font-weight: bold;
	}
	.item {
		border: 1px dotted var(--pri-color);
		margin-bottom: var(--std-margin);
		padding: var(--std-padding);
	}
</style>