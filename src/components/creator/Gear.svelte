<script>
	import { character } from '../../stores'
	import RandomRoll from '../helpers/Random'
	import MasterGearList from '../rules/Gear'
	import AmmoList from '../rules/gear/weapons/AmmoList'
	import ArmorList from '../rules/gear/ArmorList'
	import MeleeWeaponList from '../rules/gear/weapons/MeleeWeaponList'
	import RangedWeaponList from '../rules/gear/weapons/RangedWeaponList'

	let armorResult = ""

	const rollArmor = () => {
		armorResult = RandomRoll(ArmorList)
	}
</script>

<div class='gear-step'>
	<button on:click={rollArmor}>ROLL IT</button>
	<div>
		{#each ArmorList as armor}
			<div>{armor.name}</div>
		{/each}
	</div>
	<br>
	<div>My Armor: {armorResult.name}</div>
</div>