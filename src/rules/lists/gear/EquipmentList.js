import DocumentList from 'rules/lists/gear/DocumentList.js'
import DrugsList from 'rules/lists/gear/DrugsList.js'
import ElectronicsList from 'rules/lists/gear/ElectronicsList.js'
import MedicalList from 'rules/lists/gear/MedicalList.js'
import MiscellaneousList from 'rules/lists/gear/MiscellaneousList.js'
import ResourcesList from 'rules/lists/gear/ResourcesList.js'
import StorageList from 'rules/lists/gear/StorageList.js'
import ToolsList from 'rules/lists/gear/ToolsList.js'
import WearablesList from 'rules/lists/gear/WearablesList.js'

export default {
	name: `Equipment`,
	list: [
		...DocumentList.list,
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