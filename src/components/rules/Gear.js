import AccessoryList from './gear/weapons/accessories/lists/AccessoryList'
import AmmoList from './gear/weapons/ammo/lists/AmmoList'
import ArmorList from './gear/armor/lists/ArmorList'
import BombList from './gear/weapons/bombs/lists/BombList'
import DocumentList from './gear/documents/lists/DocumentList'
import DrugsList from './gear/drugs/lists/DrugsList'
import ElectronicsList from './gear/electronics/lists/ElectronicsList'
import EquipmentList from './gear/EquipmentList'
import MedicalList from './gear/medical/lists/MedicalList'
import MeleeWeaponList from './gear/weapons/melee/lists/MeleeWeaponList'
import RangedWeaponList from './gear/weapons/ranged/lists/RangedWeaponList'
import StorageList from './gear/storage/lists/StorageList'
// import VehicleList from './gear/VehiclesList'
import PropSort from '../helpers/PropSort'


const Gear = {
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
	].sort((a, b) => PropSort(a, b, `name`))
}

export default Gear