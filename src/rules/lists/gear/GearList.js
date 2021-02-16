import AccessoriesList from 'rules/lists/gear/AccessoriesList.js'
import Alphabetize from 'utils/sorting/Alphabetize.js'
import AmmoList from 'rules/lists/gear/ammo/AmmoList.js'
import ArmorList from 'rules/lists/gear/ArmorList.js'
import AttributesList from 'rules/lists/gear/attributes/AttributesList.js'
import BombsList from 'rules/lists/gear/BombsList.js'
import DocumentsList from 'rules/lists/gear/DocumentsList.js'
import DrugsList from 'rules/lists/gear/DrugsList.js'
import ElectronicsList from 'rules/lists/gear/ElectronicsList.js'
import MedicalList from 'rules/lists/gear/MedicalList.js'
import MeleeWeaponsList from 'rules/lists/gear/MeleeWeaponsList.js'
import MiscellaneousList from 'rules/lists/gear/MiscellaneousList.js'
import RangedWeaponsList from 'rules/lists/gear/RangedWeaponsList.js'
import ResourcesList from 'rules/lists/gear/ResourcesList.js'
import StorageList from 'rules/lists/gear/StorageList.js'
import ToolsList from 'rules/lists/gear/ToolsList.js'
import WearablesList from 'rules/lists/gear/WearablesList.js'

export default {
	name: `Gear`,
	list: Alphabetize([
		AccessoriesList,
		AmmoList,
		ArmorList,
		AttributesList,
		BombsList,
		DocumentsList,
		DrugsList,
		ElectronicsList,
		MedicalList,
		MeleeWeaponsList,
		MiscellaneousList,
		RangedWeaponsList,
		ResourcesList,
		StorageList,
		ToolsList,
		WearablesList,
	])
}