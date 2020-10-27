import DocumentList from 'lists/gear/DocumentList.js'
import DrugsList from 'lists/gear/DrugsList.js'
import ElectronicsList from 'lists/gear/ElectronicsList.js'
import MedicalList from 'lists/gear/MedicalList.js'
import MiscList from 'lists/gear/MiscList.js'
import ResourcesList from 'lists/gear/ResourcesList.js'
import StorageList from 'lists/gear/StorageList.js'
import ToolsList from 'lists/gear/ToolsList.js'
import WearableList from 'lists/gear/WearableList.js'

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