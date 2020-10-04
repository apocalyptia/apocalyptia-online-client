<script>
	import GearBlock from '../../../views/widgets/GearBlock.svelte'
	import RandomStartingGear from '../../../helpers/random/RandomStartingGear'
	import { character } from '../../../stores/characterStore'
	import { beforeUpdate } from 'svelte'

	let gearedUp = false

	const randomStartingGear = () => {
		$character = RandomStartingGear($character, $character.props.luck.score)
	}

	beforeUpdate(_ => {
		gearedUp = Object.values($character.gear).every(g => g.inventory.length)
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Gear</title>
</svelte:head>
<h1>Gear</h1>
<div class='explanation'>
	<p>You start with some random Gear: A Melee weapon, a Ranged weapon (with a little Ammo), and Armor.</p>
</div>
{#if gearedUp}
	<div class='section-card'>
		<div class='item-category'>
			<h2>Melee Weapon</h2>
		</div>
		<div class='item'>
			<GearBlock item={$character.gear.melee.inventory[0]} mode={'edit'} />
		</div>
	</div>
	<div class='section-card'>
		<div class='item-category'>
			<h2>Ranged Weapon</h2>
		</div>
		<div class='item'>
			<GearBlock item={$character.gear.ranged.inventory[0]} mode={'edit'} />
		</div>
	</div>
	<div class='section-card'>
		<div class='item-category ammo-heading'>
			<h2>Ammo</h2>
		</div>
		<div class='item'>
			<GearBlock item={$character.gear.ammo.inventory[0]} mode={'edit'} />
		</div>
	</div>
	<div class='section-card'>
		<div class='item-category'>
			<h2>Armor</h2>
		</div>
		<div class='item'>
			<GearBlock item={$character.gear.armor.inventory[0]} mode={'edit'} />
		</div>
	</div>
	<div class='section-card'>
		<div class='item-category'>
			<h2>Equipment</h2>
		</div>
		{#each $character.gear.equipment.inventory as equipment}
			<div class='item'>
				<GearBlock item={equipment} mode={'edit'} />
			</div>
		{/each}
	</div>
{:else}
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={randomStartingGear}>Random</button>
	</div>
{/if}


<style>
	.item-category {
		margin-bottom: var(--s100);
	}
	.ammo-heading {
		margin-top: var(--s100);
	}
	.item {
		border: 1px dotted lime;
		margin-bottom: var(--s100);
		padding: var(--s100);
	}
</style>