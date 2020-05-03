import AccessoryList from './gear/weapons/accessories/lists/AccessoryList'
import AmmoList from './gear/weapons/ammo/lists/AmmoList'
import ArmorList from './gear/armor/lists/ArmorList'
import BombList from './gear/weapons/bombs/lists/BombList'
import DocumentList from './gear/DocumentList'
import DrugsList from './gear/DrugsList'
import ElectronicsList from './gear/ElectronicsList'
import EquipmentList from './gear/EquipmentList'
import MedicalList from './gear/MedicalList'
import MeleeWeaponList from './gear/weapons/melee/lists/MeleeWeaponList'
import RangedWeaponList from './gear/weapons/ranged/lists/RangedWeaponList'
import StorageList from './gear/StorageList'
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