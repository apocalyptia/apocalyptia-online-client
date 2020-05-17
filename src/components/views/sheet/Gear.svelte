<script>
import AmmoItemTable from '../tables/AmmoItemTable.svelte'
import ArmorItemTable from '../tables/ArmorItemTable.svelte'
import MeleeWeaponItemTable from '../tables/MeleeWeaponItemTable.svelte'
import RangedWeaponItemTable from '../tables/RangedWeaponItemTable.svelte'
import { character } from '../../../stores/characterStore'
import CoverTable from '../tables/CoverTable.svelte'


const trashItem = (item) => {
	if (item == 'melee') $character.gear.meleeWeapons.inventory.shift()
	else if (item == 'ranged') $character.gear.rangedWeapons.inventory.shift()
	else if (item == 'ammo') $character.gear.ammo.inventory.shift()
	else if (item == 'armor') $character.gear.armor.inventory.shift()
	$character = $character
}
</script>


<details class='sheet-card'>
	<summary class='sheet-card-title'>
		Gear
	</summary>
	<div class='sheet-card-table'>
		{#if $character.gear.meleeWeapons.inventory.length}
			<div class='gear-item'>
				<MeleeWeaponItemTable item={$character.gear.meleeWeapons.inventory[0]}/>
				<div class='trash'>
					<button on:click={() => trashItem('melee')} class='trash-button'>&#128465;</button>
				</div>
			</div>
		{/if}
		{#if $character.gear.rangedWeapons.inventory.length}
			<div class='gear-item'>
				<RangedWeaponItemTable item={$character.gear.rangedWeapons.inventory[0]}/>
				<div class='trash'>
					<button on:click={() => trashItem('ranged')} class='trash-button'>&#128465;</button>
				</div>
			</div>
		{/if}
		{#if $character.gear.ammo.inventory.length}
			<div class='gear-item'>
				<AmmoItemTable item={$character.gear.ammo.inventory[0]}/>
				<div class='trash'>
					<button on:click={() => trashItem('ammo')} class='trash-button'>&#128465;</button>
				</div>
			</div>
		{/if}
		{#if $character.gear.armor.inventory.length}
			<div class='gear-item'>
				<ArmorItemTable item={$character.gear.armor.inventory[0]}/>
				<div class='trash'>
					<button on:click={() => trashItem('armor')} class='trash-button'>&#128465;</button>
				</div>
			</div>
		{/if}
	</div>
</details>


<style>
.gear-item {
	display: flex;
	margin-bottom: var(--s100);
	margin-top: var(--s100);
}
.trash-button {
	color: rgba(15, 30, 15, 1);
	background-color: red;
	border: 1px solid red;
	height: var(--s250);
	margin-left: var(--s50);
	width: var(--s250);
}
.trash-button:hover {
	background-color: rgba(15, 30, 15, 1);
}
</style>