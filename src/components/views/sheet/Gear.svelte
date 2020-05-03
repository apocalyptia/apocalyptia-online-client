<script>
import AmmoItemTable from '../tables/AmmoItemTable.svelte'
import ArmorItemTable from '../tables/ArmorItemTable.svelte'
import MeleeWeaponItemTable from '../tables/MeleeWeaponItemTable.svelte'
import RangedWeaponItemTable from '../tables/RangedWeaponItemTable.svelte'
import { character } from '../../../stores/characterStore'
</script>


<details class='sheet-card'>
	<summary class='sheet-card-title'>
		Gear
	</summary>
	<div class='sheet-card-table'>
		<div class='gear-item'>
			<MeleeWeaponItemTable item={$character.gear.meleeWeapons.inventory[0]}/>
		</div>
		<div class='gear-item'>
			<RangedWeaponItemTable item={$character.gear.rangedWeapons.inventory[0]}/>
		</div>
		<div class='gear-item'>
			<AmmoItemTable item={$character.gear.ammo.inventory[0]}/>
		</div>
		<div class='gear-item'>
			<ArmorItemTable item={$character.gear.armor.inventory[0]}/>
		</div>
	</div>
</details>


<style>
.gear-item {
	display: block;
	margin-bottom: var(--s100);
	margin-top: var(--s100);
}
</style>