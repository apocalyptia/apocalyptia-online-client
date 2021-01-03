import AccessoryList from 'rules/lists/gear/AccessoryList.js'
import AmmoList from 'rules/lists/gear/AmmoList.js'
import ArmorList from 'rules/lists/gear/ArmorList.js'
import BombList from 'rules/lists/gear/BombList.js'
import DocumentList from 'rules/lists/gear/DocumentList.js'
import DrugsList from 'rules/lists/gear/DrugsList.js'
import ElectronicsList from 'rules/lists/gear/ElectronicsList.js'
import EquipmentList from 'rules/lists/gear/MiscList.js'
import MedicalList from 'rules/lists/gear/MedicalList.js'
import MeleeWeaponList from 'rules/lists/gear/MeleeWeaponList.js'
import RangedWeaponList from 'rules/lists/gear/RangedWeaponList.js'
import StorageList from 'rules/lists/gear/StorageList.js'
// import VehicleList from 'rules/lists/gear/VehiclesList.js'
import PropSort from 'utils/PropSort.js'

export default {
	name: `Gear`,
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
		...StorageList,
		// ...VehicleList,
	].sort((a, b) => PropSort(a, b, `name`)),
	categories: [
		'melee',
		'ranged',
		'ammo',
		'armor',
		'equipment'
	]
}