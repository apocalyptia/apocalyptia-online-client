import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'
import AccessoriesList from 'rules/lists/gear/AccessoriesList.js'
import AmmoList from 'rules/lists/gear/ammo/AmmoList.js'
import ArmorList from 'rules/lists/gear/ArmorList.js'
import AttributesList from 'rules/lists/gear/attributes/AttributesList.js'
import BombsList from 'rules/lists/gear/BombsList.js'
import Character from 'routes/character.svelte'
import CombatList from 'rules/lists/CombatList.js'
import CoreList from 'rules/lists/CoreList.js'
import Creator from 'routes/creator.svelte'
import DocumentsList from 'rules/lists/gear/DocumentsList.js'
import DrugsList from 'rules/lists/gear/DrugsList.js'
import ElectronicsList from 'rules/lists/gear/ElectronicsList.js'
import EquipmentList from 'rules/lists/gear/EquipmentList.js'
import GearList from 'rules/lists/gear/GearList.js'
import HazardsList from 'rules/lists/HazardsList.js'
import Home from 'routes/home.svelte'
import Join from 'routes/join.svelte'
import Load from 'routes/load.svelte'
import Login from 'routes/login.svelte'
import Manual from 'routes/manual.svelte'
import ManeuversList from 'rules/lists/ManeuversList.js'
import ManualList from 'rules/lists/ManualList.js'
import MedicalList from 'rules/lists/gear/MedicalList.js'
import MeleeWeaponsList from 'rules/lists/gear/MeleeWeaponsList.js'
import MiscellaneousList from 'rules/lists/gear/MiscellaneousList.js'
import NeedsList from 'rules/lists/NeedsList.js'
import New from 'routes/new.svelte'
import PropertiesList from 'rules/lists/PropertiesList.js'
import RangedWeaponsList from 'rules/lists/gear/RangedWeaponsList.js'
import Roller from 'routes/roller.svelte'
import Sheet from 'routes/sheet.svelte'
import SkillsList from 'rules/lists/SkillsList.js'
import StatusList from 'rules/lists/StatusList.js'
import StorageList from 'rules/lists/gear/StorageList.js'
import ToolsList from 'rules/lists/gear/ToolsList.js'
import TraitsList from 'rules/lists/TraitsList.js'
import WearablesList from 'rules/lists/gear/WearablesList.js'


export default [
	{ name: 'Home',				path: '/',							component: Home },
	{ name: 'Character',		path: '/character',					component: Character },
	{ name: 'Creator',			path: '/creator',					component: Creator },
	{ name: 'Load',				path: '/load',						component: Load },
	{ name: 'New',				path: '/new',						component: New },
	{ name: 'Sheet',			path: '/sheet',						component: Sheet },
	{ name: 'Join',				path: '/join',						component: Join },
	{ name: 'Login',			path: '/login',						component: Login },
	{ name: 'Manual',			path: '/manual',					component: Manual,			list: [...ManualList.list] },
		{ name: 'Abilities',		path: '/manual/abilities',			component: Manual,			list: [...AbilitiesList.list] },
		{ name: 'Combat',			path: '/manual/combat',				component: Manual,			list: [...CombatList.list] },
		{ name: 'Core',				path: '/manual/core',				component: Manual,			list: [...CoreList.list] },
		{ name: 'Gear',				path: '/manual/gear',				component: Manual,			list: [...GearList.list] },
			{ name: 'Accessories',		path: '/manual/gear/accessories',	component: Manual,			list: [...AccessoriesList.list] },
			{ name: 'Ammo',				path: '/manual/gear/ammo',			component: Manual,			list: [...AmmoList.list] },
			{ name: 'Armor',			path: '/manual/gear/armor',			component: Manual,			list: [...ArmorList.list] },
			{ name: 'Attributes',		path: '/manual/gear/attributes',	component: Manual,			list: [...AttributesList.list] },
			{ name: 'Bombs',			path: '/manual/gear/bombs',			component: Manual,			list: [...BombsList.list] },
			{ name: 'Documents',		path: '/manual/gear/documents',		component: Manual,			list: [...DocumentsList.list] },
			{ name: 'Drugs',			path: '/manual/gear/drugs',			component: Manual,			list: [...DrugsList.list] },
			{ name: 'Electronics',		path: '/manual/gear/electronics',	component: Manual,			list: [...ElectronicsList.list] },
			{ name: 'Equipment',		path: '/manual/gear/equipment',		component: Manual,			list: [...EquipmentList.list] },
			{ name: 'Medical',			path: '/manual/gear/medical',		component: Manual,			list: [...MedicalList.list] },
			{ name: 'Melee',			path: '/manual/gear/melee',			component: Manual,			list: [...MeleeWeaponsList.list] },
			{ name: 'Miscellaneous',	path: '/manual/gear/miscellaneous',	component: Manual,			list: [...MiscellaneousList.list] },
			{ name: 'Ranged',			path: '/manual/gear/ranged',		component: Manual,			list: [...RangedWeaponsList.list] },
			{ name: 'Storage',			path: '/manual/gear/storage',		component: Manual,			list: [...StorageList.list] },
			{ name: 'Tools',			path: '/manual/gear/tools',			component: Manual,			list: [...ToolsList.list] },
			{ name: 'Wearables',		path: '/manual/gear/wearables',		component: Manual,			list: [...WearablesList.list] },
		{ name: 'Hazards',			path: '/manual/hazards',			component: Manual,			list: [...HazardsList.list] },
		{ name: 'Maneuvers',		path: '/manual/maneuvers',			component: Manual,			list: [...ManeuversList.list] },
		{ name: 'Needs',			path: '/manual/needs',				component: Manual,			list: [...NeedsList.list] },
		{ name: 'Properties',		path: '/manual/properties',			component: Manual,			list: [...PropertiesList.list] },
		{ name: 'Skills',			path: '/manual/skills',				component: Manual,			list: [...SkillsList.list] },
		{ name: 'Status',			path: '/manual/status',				component: Manual,			list: [...StatusList.list] },
		{ name: 'Traits',			path: '/manual/traits',				component: Manual,			list: [...TraitsList.list] },
	{ name: 'Roller',			path: '/roller',					component: Roller },
]