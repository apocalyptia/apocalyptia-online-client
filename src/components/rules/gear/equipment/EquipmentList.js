import DocumentList from './documents/DocumentList'
import DrugsList from './drugs/DrugsList'
import ElectronicsList from './electronics/ElectronicsList'
import MedicalList from './medical/MedicalList'
import MiscList from './misc/MiscList'
import ResourcesList from './resources/ResourcesList'
import StorageList from './storage/StorageList'
import ToolsList from './tools/ToolsList'
import WearableList from './wearable/WearableList'


const EquipmentList = [
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

export default EquipmentList