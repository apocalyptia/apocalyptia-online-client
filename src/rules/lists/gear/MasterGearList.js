import AccessoriesList from '/src/rules/lists/gear/AccessoriesList.js'
import AmmoList from '/src/rules/lists/gear/ammo/AmmoList.js'
import ArmorList from '/src/rules/lists/gear/ArmorList.js'
import BombsList from '/src/rules/lists/gear/BombsList.js'
import DocumentsList from '/src/rules/lists/gear/DocumentsList.js'
import DrugsList from '/src/rules/lists/gear/DrugsList.js'
import ElectronicsList from '/src/rules/lists/gear/ElectronicsList.js'
import EquipmentList from '/src/rules/lists/gear/EquipmentList.js'
import MedicalList from '/src/rules/lists/gear/MedicalList.js'
import MeleeWeaponsList from '/src/rules/lists/gear/MeleeWeaponsList.js'
import MiscellaneousList from '/src/rules/lists/gear/MiscellaneousList.js'
import RangedWeaponsList from '/src/rules/lists/gear/RangedWeaponsList.js'
import StorageList from '/src/rules/lists/gear/StorageList.js'
import ToolsList from '/src/rules/lists/gear/ToolsList.js'
import WearablesList from '/src/rules/lists/gear/WearablesList.js'

export default [
	{
		name: `Master Gear List`,
		value: undefined,
		list: [
			...AccessoriesList.list,
			...AmmoList.list,
			...ArmorList.list,
			...BombsList.list,
			...DocumentsList.list,
			...DrugsList.list,
			...ElectronicsList.list,
			...EquipmentList.list,
			...MedicalList.list,
			...MeleeWeaponsList.list,
			...MiscellaneousList.list,
			...RangedWeaponsList.list,
			...StorageList.list,
			...ToolsList.list,
			...WearablesList.list,
		]
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
		name: `Ranged`,
		value: undefined,
		list: RangedWeaponsList.list
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