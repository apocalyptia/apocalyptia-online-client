<script>
import { character } from '../../../stores'
import RandomRoll from '../../helpers/Random'
import MasterGearList from '../../rules/Gear'
import AmmoList from '../../rules/gear/weapons/AmmoList'
import ArmorList from '../../rules/gear/ArmorList'
import MeleeWeaponList from '../../rules/gear/weapons/MeleeWeaponList'
import RangedWeaponList from '../../rules/gear/weapons/RangedWeaponList'
import GearTable from './ui/GearTable.svelte'

let melee, ranged, armor

const meleeList = ['DMG', 'RNG',]
const rangedList = ['DMG', 'RNG', 'cal', 'mag',]
const armorList = ['DR', 'location',]

const rollMelee = () => {
	melee = RandomRoll(MeleeWeaponList)
}

const rollRanged = () => {
	ranged = RandomRoll(RangedWeaponList)
}

const rollArmor = () => {
	armor = RandomRoll(ArmorList)
}
</script>


<h1>Gear</h1>
<div class='section-card'>
	<h3>Melee Weapon</h3>
	<GearTable item={melee} list={meleeList} />
	<div class='center-button'>
		<button on:click={rollMelee}>Random</button>
	</div>
</div>
<div class='section-card'>
	<h3>Ranged Weapon</h3>
	<GearTable item={ranged} list={rangedList} />
	<div class='center-button'>
		<button on:click={rollRanged}>Random</button>
	</div>
</div>
<div class='section-card'>
	<h3>Armor</h3>
	<GearTable item={armor} list={armorList} />
	<div class='center-button'>
		<button on:click={rollArmor}>Random</button>
	</div>
</div>


<style>
.section-card {
	display: block;
	margin: var(--base-unit);
}
.center-button {
	margin: auto;
	text-align: center;
}
</style>