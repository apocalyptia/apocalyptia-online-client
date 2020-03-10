<script>
import AmmoItemTable from '../../components/views/tables/AmmoItemTable.svelte'
import AmmoList from '../../components/rules/gear/weapons/AmmoList'
import ArmorItemTable from '../../components/views/tables/ArmorItemTable.svelte'
import ArmorList from '../../components/rules/gear/ArmorList'
import MeleeWeaponItemTable from '../../components/views/tables/MeleeWeaponItemTable.svelte'
import MeleeWeaponList from '../../components/rules/gear/weapons/MeleeWeaponList'
import RangedWeaponItemTable from '../../components/views/tables/RangedWeaponItemTable.svelte'
import RangedWeaponList from '../../components/rules/gear/weapons/RangedWeaponList'
import { Nd6, RandomRoll } from '../../components/functions/Random'
import { character } from '../../stores/characterStore'
import NavBar from '../../components/views/controls/NavBar.svelte'

const randomMelee = () => {
	$character.gear.meleeWeapons.inventory.push(RandomRoll(MeleeWeaponList))
	$character = $character
}

const randomRanged = () => {
	$character.gear.rangedWeapons.inventory.push(RandomRoll(RangedWeaponList))
	$character = $character
}

const randomAmmo = () => {
	let ammo = RandomRoll(AmmoList)
	while (ammo.cal != $character.gear.rangedWeapons.inventory[0].cal) {
		ammo = RandomRoll(AmmoList)
	}
	ammo.qty = Nd6(3)
	$character.gear.ammo.inventory.push(ammo)
	$character = $character
}

const randomArmor = () => {
	$character.gear.armor.inventory.push(RandomRoll(ArmorList))
	$character = $character
}
</script>


<h1>Gear</h1>
<div class='section-card'>
	<h2>Melee Weapon</h2>
	{#if $character.gear.meleeWeapons.inventory.length > 0}
		<MeleeWeaponItemTable item={$character.gear.meleeWeapons.inventory[0]}/>
	{:else}
		<div class='center-button'>
			<button on:click={randomMelee}>Random</button>
		</div>
	{/if}
</div>
<div class='section-card'>
	<h2>Ranged Weapon</h2>
	{#if $character.gear.rangedWeapons.inventory.length}
		<RangedWeaponItemTable item={$character.gear.rangedWeapons.inventory[0]}/>
	{:else}
		<div class='center-button'>
			<button on:click={randomRanged}>Random</button>
		</div>
	{/if}
</div>
{#if $character.gear.rangedWeapons.inventory.length}
<div class='section-card'>
	<h2>Ammo</h2>
	{#if $character.gear.ammo.inventory.length}
		<AmmoItemTable item={$character.gear.ammo.inventory[0]}/>
	{:else}
		<div class='center-button'>
			<button on:click={randomAmmo}>Random</button>
		</div>
	{/if}
</div>
{/if}
<div class='section-card'>
	<h2>Armor</h2>
	{#if $character.gear.armor.inventory.length}
		<ArmorItemTable item={$character.gear.armor.inventory[0]}/>
	{:else}
		<div class='center-button'>
			<button on:click={randomArmor}>Random</button>
		</div>
	{/if}
</div>
<NavBar links={{back: '/creator/abilities', next: '/creator/sheet'}}/>


<style>
.section-card {
	display: block;
}
h2 {
	margin-bottom: var(--half-unit);
}
</style>