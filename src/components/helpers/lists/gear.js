import AccessoryList from '../../rules/gear/weapons/AccessoryList'
import AmmoList from '../../rules/gear/weapons/AmmoList'
import ArmorList from '../../rules/gear/ArmorList'
import BombList from '../../rules/gear/weapons/BombList'
import DocumentList from '../../rules/gear/DocumentList'
import DrugsList from '../../rules/gear/DrugsList'
import ElectronicsList from '../../rules/gear/ElectronicsList'
import EquipmentList from '../../rules/gear/EquipmentList'
import MedicalList from '../../rules/gear/MedicalList'
import MeleeWeaponList from '../../rules/gear/weapons/MeleeWeaponList'
import RangedWeaponList from '../../rules/gear/weapons/RangedWeaponList'
import StorageList from '../../rules/gear/StorageList'
// export { VehicleList } from '../../components/rules//gear/Vehicles'

export const WeaponList = [
	...MeleeWeaponList,
	...RangedWeaponList
]

export const MasterGearList = [
	...AccessoryList,
	...AmmoList,
	...ArmorList,
	...BombList,
	...DocumentList,
	...DrugsList,
	...ElectronicsList,
	...EquipmentList,
	...MedicalList,
	...StorageList,
	...WeaponList
]