<script>
	import { character } from '../../../stores'
	import RandomRoll from '../../helpers/Random'
	import MasterGearList from '../../rules/Gear'
	import AmmoList from '../../rules/gear/weapons/AmmoList'
	import ArmorList from '../../rules/gear/ArmorList'
	import MeleeWeaponList from '../../rules/gear/weapons/MeleeWeaponList'
	import RangedWeaponList from '../../rules/gear/weapons/RangedWeaponList'
	import GearTable from '../ui/creator/GearTable.svelte'

	let melee, ranged, armor

	const meleeList = ['Damage', 'Range',]
	const rangedList = ['Damage', 'Range', 'cal', 'mag',]
	const armorList = ['Damage Resistance', 'location',]

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


<div class='gear-step'>
	<div class='step-title'>
		<h2>Gear</h2>
	</div>
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
</div>


<style>
	.section-card {
		display: block;
		margin: 1rem;
	}
</style>