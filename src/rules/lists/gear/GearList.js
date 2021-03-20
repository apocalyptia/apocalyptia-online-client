import AccessoriesList from '/src/rules/lists/gear/AccessoriesList.js'
import Alphabetize from '/src/utils/sorting/Alphabetize.js'
import AmmoList from '/src/rules/lists/gear/ammo/AmmoList.js'
import ArmorList from '/src/rules/lists/gear/ArmorList.js'
import AttributesList from '/src/rules/lists/gear/attributes/AttributesList.js'
import BombsList from '/src/rules/lists/gear/BombsList.js'
import DocumentsList from '/src/rules/lists/gear/DocumentsList.js'
import DrugsList from '/src/rules/lists/gear/DrugsList.js'
import ElectronicsList from '/src/rules/lists/gear/ElectronicsList.js'
import MedicalList from '/src/rules/lists/gear/MedicalList.js'
import MeleeWeaponsList from '/src/rules/lists/gear/MeleeWeaponsList.js'
import MiscellaneousList from '/src/rules/lists/gear/MiscellaneousList.js'
import RangedWeaponsList from '/src/rules/lists/gear/RangedWeaponsList.js'
import ResourcesList from '/src/rules/lists/gear/ResourcesList.js'
import StorageList from '/src/rules/lists/gear/StorageList.js'
import ToolsList from '/src/rules/lists/gear/ToolsList.js'
import WearablesList from '/src/rules/lists/gear/WearablesList.js'

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