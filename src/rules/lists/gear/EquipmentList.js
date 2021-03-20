import DocumentsList from '/src/rules/lists/gear/DocumentsList.js'
import DrugsList from '/src/rules/lists/gear/DrugsList.js'
import ElectronicsList from '/src/rules/lists/gear/ElectronicsList.js'
import MedicalList from '/src/rules/lists/gear/MedicalList.js'
import MiscellaneousList from '/src/rules/lists/gear/MiscellaneousList.js'
import ResourcesList from '/src/rules/lists/gear/ResourcesList.js'
import StorageList from '/src/rules/lists/gear/StorageList.js'
import ToolsList from '/src/rules/lists/gear/ToolsList.js'
import WearablesList from '/src/rules/lists/gear/WearablesList.js'

export default {
	name: `Equipment`,
	list: [
		...DocumentsList.list,
		...DrugsList.list,
		...ElectronicsList.list,
		...MedicalList.list,
		...MiscellaneousList.list,
		...ResourcesList.list,
		...StorageList.list,
		...ToolsList.list,
		...WearablesList.list,
	]
}