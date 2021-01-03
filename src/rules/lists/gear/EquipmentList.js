import DocumentList from 'rules/lists/gear/DocumentList.js'
import DrugsList from 'rules/lists/gear/DrugsList.js'
import ElectronicsList from 'rules/lists/gear/ElectronicsList.js'
import MedicalList from 'rules/lists/gear/MedicalList.js'
import MiscList from 'rules/lists/gear/MiscList.js'
import ResourcesList from 'rules/lists/gear/ResourcesList.js'
import StorageList from 'rules/lists/gear/StorageList.js'
import ToolsList from 'rules/lists/gear/ToolsList.js'
import WearableList from 'rules/lists/gear/WearableList.js'

export default [
	...DocumentList,
	...DrugsList,
	...ElectronicsList,
	...MedicalList,
	...MiscList,
	...ResourcesList,
	...StorageList,
	...ToolsList,
	...WearableList,
]