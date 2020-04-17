<script>
	import AccessoryList from '../../components/rules/gear/weapons/AccessoryList'
	import AmmoList from '../../components/rules/gear/weapons/AmmoList'
	import ArmorList from '../../components/rules/gear/ArmorList'
	import BombList from '../../components/rules/gear/weapons/BombList'
	import DocumentList from '../../components/rules/gear/DocumentList'
	import DrugsList from '../../components/rules/gear/DrugsList'
	import ElectronicsList from '../../components/rules/gear/ElectronicsList'
	import EquipmentList from '../../components/rules/gear/EquipmentList'
	import GearBlock from '../../components/views/ui/GearBlock.svelte'
	import MedicalList from '../../components/rules/gear/MedicalList'
	import MeleeWeaponList from '../../components/rules/gear/weapons/MeleeWeaponList'
	import NavBar from '../../components/views/controls/NavBar.svelte'
	import RangedWeaponList from '../../components/rules/gear/weapons/RangedWeaponList'
	import StorageList from '../../components/rules/gear/StorageList'
	import {
		d6Roll,
		Nd6,
		RandomRoll
	} from '../../components/helpers/Random'


	let roll = 0

	let mod = 0

	let result = 0

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
			<h2>{gear.value.name}</h2>
			<GearBlock rule={gear.value}/>
		{/if}
	</div>
{/each}
<NavBar links={{back: '/', next: '/'}} proceed={true}/>


<style>
.item-category {
	display: flex;
	justify-content: space-between;
	margin-bottom: var(--s50);
}
.gear-category {
	font-size: var(--s125);
}
h2 {
	margin-bottom: var(--s50);
}
</style>