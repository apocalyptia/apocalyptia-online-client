import AccessoryList from 'lists/gear/AccessoryList.js'
import AmmoList from 'lists/gear/AmmoList.js'
import ArmorList from 'lists/gear/ArmorList.js'
import BombList from 'lists/gear/BombList.js'
import DocumentList from 'lists/gear/DocumentList.js'
import DrugsList from 'lists/gear/DrugsList.js'
import ElectronicsList from 'lists/gear/ElectronicsList.js'
import EquipmentList from 'lists/gear/MiscList.js'
import MedicalList from 'lists/gear/MedicalList.js'
import MeleeWeaponList from 'lists/gear/MeleeWeaponList.js'
import RangedWeaponList from 'lists/gear/RangedWeaponList.js'
import StorageList from 'lists/gear/StorageList.js'
// import VehicleList from 'lists/gear/VehiclesList.js'
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
		'equipment.js'
	]
}