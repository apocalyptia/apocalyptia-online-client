import { AccessoryList } from '../../components/rules/gear/Accessories'
import { AmmoList } from '../../components/rules//gear/Ammo'
import { ArmorList } from '../../components/rules//gear/Armor'
import { BombList } from '../../components/rules//gear/Bombs'
import { DocumentList } from '../../components/rules//gear/Documents'
import { DrugsList } from '../../components/rules//gear/Drugs'
import { ElectronicsList } from '../../components/rules//gear/Electronics'
import { EquipmentList } from '../../components/rules//gear/Equipment'
import { MedicalList } from '../../components/rules//gear/Medical'
import { MeleeList } from '../../components/rules//gear/MeleeWeapons'
import { RangedList } from '../../components/rules//gear/RangedWeapons'
import { StorageList } from '../../components/rules//gear/Storage'
// import { VehicleList } from '../../components/rules//gear/Vehicles'


export { AccessoryList }
export { AmmoList }
export { ArmorList }
export { BombList }
export { DocumentList }
export { DrugsList }
export { ElectronicsList }
export { EquipmentList }
export { MedicalList }
export { MeleeList }
export { RangedList }
export { StorageList }

export const WeaponList = [
	...MeleeList,
	...RangedList
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
	...MeleeList,
	...RangedList,
	...StorageList
]