import AccessoryList from './weapons/accessories/AccessoryList'
import AmmoList from './weapons/ammo/AmmoList'
import ArmorList from './armor/ArmorList'
import BombList from './weapons/bombs/BombList'
import DocumentList from './equipment/documents/DocumentList'
import DrugsList from './equipment/drugs/DrugsList'
import ElectronicsList from './equipment/electronics/ElectronicsList'
import EquipmentList from './equipment/misc/MiscList'
import MedicalList from './equipment/medical/MedicalList'
import MeleeWeaponList from './weapons/melee/MeleeWeaponList'
import RangedWeaponList from './weapons/ranged/RangedWeaponList'
import StorageList from './equipment/storage/StorageList'
// import VehicleList from './gear/VehiclesList'
import PropSort from '../../helpers/PropSort'


const GearList = {
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

export default GearList