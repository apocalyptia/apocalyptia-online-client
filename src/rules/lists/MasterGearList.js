import AccessoriesList from './gear/AccessoriesList.js'
import AmmoList from './gear/ammo/AmmoList.js'
import ArmorList from './gear/ArmorList.js'
import BombsList from './gear/BombsList.js'
import DocumentsList from './gear/DocumentsList.js'
import DrugsList from './gear/DrugsList.js'
import ElectronicsList from './gear/ElectronicsList.js'
import EquipmentList from './gear/EquipmentList.js'
import GearList from './GearList.js'
import MedicalList from './gear/MedicalList.js'
import MeleeWeaponsList from './gear/MeleeWeaponsList.js'
import MiscellaneousList from './gear/MiscellaneousList.js'
import ProjectileWeaponsList from './gear/ProjectileWeaponsList.js'
import StorageList from './gear/StorageList.js'
import ToolsList from './gear/ToolsList.js'
import WearablesList from './gear/WearablesList.js'

export default [
	{
		name: `Master Gear List`,
		value: undefined,
		list: GearList.list
	},
	{
		name: `Accessory`,
		value: undefined,
		list: AccessoriesList.list
	},
	{
		name: `Ammo`,
		value: undefined,
		list: AmmoList.list
	},
	{
		name: `Armor`,
		value: undefined,
		list: ArmorList.list
	},
	{
		name: `Bomb`,
		value: undefined,
		list: BombsList.list
	},
	{
		name: `Document`,
		value: undefined,
		list: DocumentsList.list
	},
	{
		name: `Drug`,
		value: undefined,
		list: DrugsList.list
	},
	{
		name: `Electronics`,
		value: undefined,
		list: ElectronicsList.list
	},
	{
		name: `Equipment`,
		value: undefined,
		list: EquipmentList.list
	},
	{
		name: `Medical`,
		value: undefined,
		list: MedicalList.list
	},
	{
		name: `Melee`,
		value: undefined,
		list: MeleeWeaponsList.list
	},
	{
		name: `Miscellaneous`,
		value: undefined,
		list: MiscellaneousList.list
	},
	{
		name: `Projectile`,
		value: undefined,
		list: ProjectileWeaponsList.list
	},
	{
		name: `Storage`,
		value: undefined,
		list: StorageList.list
	},
	{
		name: `Tools`,
		value: undefined,
		list: ToolsList.list
	},
	{
		name: `Wearables`,
		value: undefined,
		list: WearablesList.list
	}
]
