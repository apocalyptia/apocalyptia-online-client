<script>
import { character } from '../../../../stores'
import { Nd6, RandomRoll } from '../../../functions/Random'
import AmmoList from '../../../rules/gear/weapons/AmmoList'
import ArmorList from '../../../rules/gear/ArmorList'
import MeleeWeaponList from '../../../rules/gear/weapons/MeleeWeaponList'
import RangedWeaponList from '../../../rules/gear/weapons/RangedWeaponList'

export let type

let item = false
let quantity = 0

const randomItem = () => {
	if (type == 'Melee') {
		item = RandomRoll(MeleeWeaponList)
		$character.gear.meleeWeapons.inventory.push(item)
	}
	else if (type == 'Ranged') {
		item = RandomRoll(RangedWeaponList)
		$character.gear.rangedWeapons.inventory.push(item)
		$character = $character
	}
	else if (type == 'Ammo') {
		item = RandomRoll(AmmoList)
		while (item.cal != $character.gear.rangedWeapons.inventory[0].cal) {
			item = RandomRoll(AmmoList)
		}
		quantity = Nd6(3)
		$character.gear.ammo.inventory.push(item)
	}
	else if (type == 'Armor') {
		item = RandomRoll(ArmorList)
		$character.gear.armor.inventory.push(item)
	}
}
</script>


<h2>{type} {#if type == 'Melee' || type == 'Ranged'}Weapon{/if}</h2>
{#if item}
	<table>
		<tr>
			<td>Name: {item.name}</td>
		</tr>
		{#if type == 'Melee' || type == 'Ranged'}
			<tr>
				<td>Dmg: {item.dmg}</td>
				<td>Rng: {item.rng}</td>
				<td>Sz: {item.sz}</td>
			</tr>
			{#if type == 'Ranged'}
				<tr>
					<td>Mag: {item.mag}</td>
					<td>Cal: {item.cal}</td>
				</tr>
			{/if}
		{:else if type == 'Ammo'}
			<tr>
				<td>Cal: {item.cal}</td>
				<td>Sz: {item.sz}</td>
				<td>Qty: {quantity}</td>
			</tr>
		{:else if type == 'Armor'}
			<tr>
				<td>Dr: {item.dr}</td>
				<td>Loc: {item.location}</td>
			</tr>
		{/if}
		{#if item.attributes.length}
			<tr>
				<td>
					Attributes:
					{#each item.attributes as attr, index}
						{attr.name}{#if index < item.attributes.length - 1},&nbsp;{/if}
					{/each}
				</td>
			</tr>
		{/if}
	</table>
{:else}
	<div class='center-button'>
		<button on:click={randomItem}>Random</button>
	</div>
{/if}


<style>
	h2 {
		margin-bottom: var(--half-unit);
	}
</style>