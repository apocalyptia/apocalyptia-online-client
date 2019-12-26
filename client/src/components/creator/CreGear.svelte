<script>
	import { fade } from 'svelte/transition'
	import {
		AccessoryList,
		AmmoList,
		ArmorList,
		BombList,
		DocumentList,
		DrugsList,
		ElectronicsList,
		EquipmentList,
		MedicalList,
		MeleeList,
		RangedList,
		StorageList,
		MasterGearList
	} from '../rules/Gear'
	import { random } from '../../functions/Random'
	import { character } from '../../stores'

	let armorResult = ""

	const rollArmor = () => {
		armorResult = random(ArmorList)
	}
</script>

<div class='gear-step' in:fade>
	<button on:click={rollArmor}>ROLL IT</button>
	<div>
		{#each ArmorList as armor}
			<div>{armor.name}</div>
		{/each}
	</div>
	<br>
	<div>My Armor: {armorResult.name}</div>
</div>