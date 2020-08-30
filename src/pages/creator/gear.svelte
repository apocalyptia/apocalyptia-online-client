<script>
	import GearBlock from '../../components/views/ui/GearBlock.svelte'
	import NavBar from '../../components/views/controls/NavBar.svelte'
	import RandomStartingGear from '../../components/helpers/random/RandomStartingGear'
	import { beforeUpdate } from 'svelte'
	import { character } from '../../stores/characterStore'

	export let readonly = true

	let status = `stop`

	let next = `/creator/gear`

	const randomStartingGear = () => {
		$character = RandomStartingGear($character, $character.props.luck.score)
	}

	beforeUpdate(() => {
		status = `go`
		for (let i of Object.values($character.gear)) {
			if (i.inventory.length == 0) {
				status = `stop`
				break
			}
		}
		if (status == `go`) next = `/creator/sheet`
		else next = `/creator/gear`
	})
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Gear</title>
</svelte:head>
<div class='gear-step'>
	<h1>Gear</h1>
	<div class='explanation'>
		<p>You start with some random Gear: A Melee weapon, a Ranged weapon (with a little Ammo), and Armor.</p>
	</div>
	{#if !$character.gear.melee.inventory.length}
		<div class='cntr-btn'>
			<button on:click={randomStartingGear}>Random</button>
		</div>
	{:else}
		<div class='section-card'>
			<div class='item-category'>
				<h2>Melee Weapon</h2>
			</div>
			{#if $character.gear.melee.inventory.length > 0}
				<div class='item'>
					<GearBlock rule={$character.gear.melee.inventory[0]} />
				</div>
			{/if}
		</div>
		<div class='section-card'>
			<div class='item-category'>
				<h2>Ranged Weapon</h2>
			</div>
			{#if $character.gear.ranged.inventory.length}
				<div class='item'>
					<GearBlock rule={$character.gear.ranged.inventory[0]} />
				</div>
				<div class='item-category ammo-heading'>
					<h2>Ammo</h2>
				</div>
				<div class='item'>
					<GearBlock rule={$character.gear.ammo.inventory[0]} {readonly} />
				</div>
			{/if}
		</div>
		<div class='section-card'>
			<div class='item-category'>
				<h2>Armor</h2>
			</div>
			{#if $character.gear.armor.inventory.length}
				<div class='item'>
					<GearBlock rule={$character.gear.armor.inventory[0]} />
				</div>
			{/if}
		</div>
		<div class='section-card'>
			<div class='item-category'>
				<h2>Equipment</h2>
			</div>
			{#if $character.gear.equipment.inventory.length}
				{#each $character.gear.equipment.inventory as equipment}
					<div class='item'>
						<GearBlock rule={equipment} />
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
<NavBar links={{back: '/creator/abilities', next: next}} {status}/>


<style>
	.item-category {
		margin-bottom: var(--s100);
	}
	.ammo-heading {
		margin-top: var(--s100);
	}
	.item {
		border: 1px dotted lime;
		padding: var(--s100);
	}
</style>