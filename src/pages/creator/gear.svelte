<script>
	import AmmoList from '../../components/rules/gear/weapons/ammo/AmmoList'
	import ArmorList from '../../components/rules/gear/armor/ArmorList'
	import EquipmentList from '../../components/rules/gear/equipment/EquipmentList'
	import MeleeWeaponList from '../../components/rules/gear/weapons/melee/MeleeWeaponList'
	import NavBar from '../../components/views/controls/NavBar.svelte'
	import RangedWeaponList from '../../components/rules/gear/weapons/ranged/RangedWeaponList'
	import Nd6 from '../../components/helpers/random/Nd6'
	import RandomRoll from '../../components/helpers/random/RandomRoll'
	import GearBlock from '../../components/views/ui/GearBlock.svelte'
	import { beforeUpdate } from 'svelte'
	import { character } from '../../stores/characterStore'

	export let readonly = true

	let status = `stop`

	let next = `/creator/gear`

	let carriedGear = []

	const randomMelee = () => {
		const randomMeleeWeaponItem = RandomRoll(MeleeWeaponList)
		$character.gear.melee.inventory.push(randomMeleeWeaponItem)
		$character = $character
	}

	const randomRanged = () => {
		const randomRangedWeaponItem = RandomRoll(RangedWeaponList)
		$character.gear.ranged.inventory.push(randomRangedWeaponItem)
		let ammo = RandomRoll(AmmoList)
		while (ammo.cal != $character.gear.ranged.inventory[0].cal) {
			ammo = RandomRoll(AmmoList)
		}
		ammo.qty = Nd6(1)
		$character.gear.ammo.inventory.push(ammo)
		$character = $character
	}

	const randomArmor = () => {
		const randomArmorItem = RandomRoll(ArmorList)
		$character.gear.armor.inventory.push(randomArmorItem)
		$character = $character
	}

	const randomEquipment = () => {
		for (let i = 0; i < $character.props.luck.score; i++) {
			const randomEquipmentItem = RandomRoll(EquipmentList)
			carriedGear.push(randomEquipmentItem)
		}
		$character.gear.equipment.inventory = [...carriedGear]
		$character = $character
	}

	const randomStartingGear = () => {
		randomMelee()
		randomRanged()
		randomArmor()
		randomEquipment()
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