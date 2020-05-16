<script>
import AmmoItemTable from '../../components/views/tables/AmmoItemTable.svelte'
import AmmoList from '../../components/rules/gear/weapons/ammo/AmmoList'
import ArmorItemTable from '../../components/views/tables/ArmorItemTable.svelte'
import ArmorList from '../../components/rules/gear/armor/ArmorList'
import MeleeWeaponItemTable from '../../components/views/tables/MeleeWeaponItemTable.svelte'
import MeleeWeaponList from '../../components/rules/gear/weapons/melee/MeleeWeaponList'
import NavBar from '../../components/views/controls/NavBar.svelte'
import RangedWeaponItemTable from '../../components/views/tables/RangedWeaponItemTable.svelte'
import RangedWeaponList from '../../components/rules/gear/weapons/ranged/RangedWeaponList'
import Nd6 from '../../components/helpers/random/Nd6'
import RandomRoll from '../../components/helpers/random/RandomRoll'
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import { referenceStore } from '../../stores/referenceStore'


let status = `stop`

let next = `/creator/gear`

const randomMelee = () => {
	$character.gear.meleeWeapons.inventory.push(RandomRoll(MeleeWeaponList))
	$character = $character
}

const randomRanged = () => {
	$character.gear.rangedWeapons.inventory.push(RandomRoll(RangedWeaponList))
	let ammo = RandomRoll(AmmoList)
	while (ammo.cal != $character.gear.rangedWeapons.inventory[0].cal) {
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
		{#if $character.gear.meleeWeapons.inventory.length > 0}
			<MeleeWeaponItemTable item={$character.gear.meleeWeapons.inventory[0]}/>
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
		{#if $character.gear.rangedWeapons.inventory.length}
			<RangedWeaponItemTable item={$character.gear.rangedWeapons.inventory[0]}/>
			<div class='item-category ammo-heading'>
				<h2>Ammo</h2>
			</div>
			<AmmoItemTable item={$character.gear.ammo.inventory[0]}/>
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
			<ArmorItemTable item={$character.gear.armor.inventory[0]}/>
		{:else}
			<div class='cntr-btn'>
				<button on:click={randomArmor}>Random</button>
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
</style>