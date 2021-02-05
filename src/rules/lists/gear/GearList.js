import AccessoryList from '$rules/lists/gear/AccessoryList.js'
import Alphabetize from '$utils/Alphabetize.js'
import AmmoList from '$rules/lists/gear/ammo/AmmoList.js'
import ArmorList from '$rules/lists/gear/ArmorList.js'
import AttributesList from '$rules/lists/gear/attributes/AttributesList.js'
import BombList from '$rules/lists/gear/BombList.js'
import DocumentList from '$rules/lists/gear/DocumentList.js'
import DrugsList from '$rules/lists/gear/DrugsList.js'
import ElectronicsList from '$rules/lists/gear/ElectronicsList.js'
import MedicalList from '$rules/lists/gear/MedicalList.js'
import MeleeWeaponList from '$rules/lists/gear/MeleeWeaponList.js'
import MiscellaneousList from '$rules/lists/gear/MiscellaneousList.js'
import RangedWeaponList from '$rules/lists/gear/RangedWeaponList.js'
import ResourcesList from '$rules/lists/gear/ResourcesList.js'
import StorageList from '$rules/lists/gear/StorageList.js'
import ToolsList from '$rules/lists/gear/ToolsList.js'
import WearablesList from '$rules/lists/gear/WearablesList.js'

export default {
	name: `Gear`,
	list: Alphabetize([
		AccessoryList,
		AmmoList,
		ArmorList,
		AttributesList,
		BombList,
		DocumentList,
		DrugsList,
		ElectronicsList,
		MedicalList,
		MeleeWeaponList,
		MiscellaneousList,
		RangedWeaponList,
		ResourcesList,
		StorageList,
		ToolsList,
		WearablesList,
	])
}