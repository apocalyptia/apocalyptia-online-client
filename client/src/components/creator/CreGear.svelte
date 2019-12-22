<script>
	import {
		AccessoryList,
		AmmoList,
		ArmorList, 
		RandomArmor,
		BombList,
		DocumentList,
		DrugsList,
		ElectronicsList,
		EquipmentList,
		MedicalList,
		MeleeList,
		RangedList,
		StorageList
	} from '../rules/Gear'
	import { CharacterStore } from '../../stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	let armorResult = ""

	function rollArmor() {
		armorResult = RandomArmor()
	}
</script>

<button on:click={rollArmor}>ROLL IT</button>
<div>
	{#each ArmorList as armor}
		<div>{armor.name}</div>
	{/each}
</div>
<br>
<div>My Armor: {armorResult.name}</div>