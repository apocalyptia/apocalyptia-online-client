<script>
import AmmoList from '../../components/rules/gear/weapons/ammo/AmmoList'
import ArmorList from '../../components/rules/gear/armor/ArmorList'
import EquipmentList from '../../components/rules/gear/equipment/EquipmentList'
import MeleeWeaponList from '../../components/rules/gear/weapons/melee/MeleeWeaponList'
import NavBar from '../../components/views/controls/NavBar.svelte'
import RangedWeaponList from '../../components/rules/gear/weapons/ranged/RangedWeaponList'
import Nd6 from '../../components/helpers/random/Nd6'
import RandomRoll from '../../components/helpers/random/RandomRoll'
import GearBlock from '../../components/views/ui/GearBlock'
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import { getModulesArrayBounds } from 'webpack/lib/Template'


export let readonly = true

let status = `stop`

let next = `/creator/gear`

let carriedGear = []

const randomMelee = () => {
	$character.gear.melee.inventory.push(RandomRoll(MeleeWeaponList))
	$character = $character
}

const randomRanged = () => {
	$character.gear.ranged.inventory.push(RandomRoll(RangedWeaponList))
	let ammo = RandomRoll(AmmoList)
	while (ammo.cal != $character.gear.ranged.inventory[0].cal) {
		ammo = RandomRoll(AmmoList)
	}
	ammo.qty = Nd6(1)
	$character.gear.ammo.inventory.push(ammo)
	$character = $character
}

const randomArmor = () => {
	$character.gear.armor.inventory.push(RandomRoll(ArmorList))
	$character = $character
}

const randomEquipment = () => {
	for (let i = 0; i < $character.props.luck.score; i++) {
		const randomItem = RandomRoll(EquipmentList)
		carriedGear.push(randomItem)
	}
	$character.gear.equipment.inventory = [...carriedGear]
	$character = $character
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
	<div class='section-card'>
		<div class='item-category'>
			<h2>Melee Weapon</h2>
		</div>
		{#if $character.gear.melee.inventory.length > 0}
			<div class='item'>
				<GearBlock rule={$character.gear.melee.inventory[0]} />
			</div>
		{:else}
			<div class='cntr-btn'>
				<button on:click={randomMelee}>Random</button>
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
		{:else}
			<div class='cntr-btn'>
				<button on:click={randomRanged}>Random</button>
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
		{:else}
			<div class='cntr-btn'>
				<button on:click={randomArmor}>Random</button>
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
		{:else}
			<div class='cntr-btn'>
				<button on:click={randomEquipment}>Random</button>
			</div>
		{/if}
	</div>
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