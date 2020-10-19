<script>
	import BackButton from 'views/widgets/BackButton.svelte'
	import AccessoryList from 'rules/gear/weapons/accessories/AccessoryList.js'
	import AmmoList from 'rules/gear/weapons/ammo/AmmoList.js'
	import ArmorList from 'rules/gear/armor/ArmorList.js'
	import BombList from 'rules/gear/weapons/bombs/BombList.js'
	import DocumentList from 'rules/gear/equipment/documents/DocumentList.js'
	import DrugsList from 'rules/gear/equipment/drugs/DrugsList.js'
	import ElectronicsList from 'rules/gear/equipment/electronics/ElectronicsList.js'
	import EquipmentList from 'rules/gear/equipment/EquipmentList.js'
	import GearBlock from 'views/widgets/GearBlock.svelte'
	import MedicalList from 'rules/gear/equipment/medical/MedicalList.js'
	import MeleeWeaponList from 'rules/gear/weapons/melee/MeleeWeaponList.js'
	import RandomRoll from 'random/RandomRoll.js'
	import RangedWeaponList from 'rules/gear/weapons/ranged/RangedWeaponList.js'
	import StorageList from 'rules/gear/equipment/storage/StorageList.js'
	import d6Roll from 'random/d6Roll.js'

	let roll = 0, mod = 0, result = 0

	let GearList = [
		{
			name: 'Master Gear List',
			value: undefined,
			list: [
				...AccessoryList,
				...AmmoList,
				...ArmorList,
				...BombList,
				...DocumentList,
				...DrugsList,
				...ElectronicsList,
				...EquipmentList,
				...MedicalList,
				...MeleeWeaponList,
				...RangedWeaponList,
				...StorageList
			]
		},
		{
			name: 'Accessory',
			value: undefined,
			list: AccessoryList
		},
		{
			name: 'Ammo',
			value: undefined,
			list: AmmoList
		},
		{
			name: 'Armor',
			value: undefined,
			list: ArmorList
		},
		{
			name: 'Bomb',
			value: undefined,
			list: BombList
		},
		{
			name: 'Document',
			value: undefined,
			list: DocumentList
		},
		{
			name: 'Drug',
			value: undefined,
			list: DrugsList
		},
		{
			name: 'Electronics',
			value: undefined,
			list: ElectronicsList
		},
		{
			name: 'Equipment',
			value: undefined,
			list: EquipmentList
		},
		{
			name: 'Medical',
			value: undefined,
			list: MedicalList
		},
		{
			name: 'Melee',
			value: undefined,
			list: MeleeWeaponList
		},
		{
			name: 'Ranged',
			value: undefined,
			list: RangedWeaponList
		},
		{
			name: 'Storage',
			value: undefined,
			list: StorageList
		},
	]

	const randomItem = (item) => {
		item.value = RandomRoll(item.list)
		return item
	}

	const rolld6 = () => {
		roll = d6Roll()
		result = roll + mod
	}
</script>


<svelte:head>
	<title>Apocalyptia Online Random Generator</title>
</svelte:head>
<h1>Random Generator</h1>
<div class='section-card'>
	<p><span class='gear-category'>d6 Roll</span></p>
	<p>Modifier: <input type='number' bind:value='{mod}'></p>
	<p>Roll: {#if result == -666}1, 1{:else}{roll}{/if}</p>
	<div class='item-category'>
		<h3>Result:</h3> {#if result == -666}Botch!{:else}{result}{/if}
		<button on:click={rolld6}>Random</button>
	</div>
</div>
{#each GearList as gear, i}
	<div class='section-card'>
		<div class='item-category'>
			<span class='gear-category'>
				{gear.name}
			</span>
			<button on:click={() => {
				GearList[i] = randomItem(gear)
				GearList = GearList
			}}>
				Random
			</button>
		</div>
		{#if gear.value != undefined}
			<GearBlock item={gear.value} mode={'manual'}/>
		{/if}
	</div>
{/each}
<BackButton path={'/'} />


<style>
	.item-category {
		display: flex;
		justify-content: space-between;
	}
	.gear-category {
		font-size: var(--s125);
		margin: auto;
	}
</style>