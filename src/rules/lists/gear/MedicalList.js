import Bandage from '/src/rules/gear/equipment/medical/Bandage.js'
import Crutch from '/src/rules/gear/equipment/medical/Crutch.js'
import EMTBag from '/src/rules/gear/equipment/medical/EMTBag.js'
import FirstAidKit from '/src/rules/gear/equipment/medical/FirstAidKit.js'
import PressureCuff from '/src/rules/gear/equipment/medical/PressureCuff.js'
import Stethoscope from '/src/rules/gear/equipment/medical/Stethoscope.js'
import SurgeryKit from '/src/rules/gear/equipment/medical/SurgeryKit.js'
import Thermometer from '/src/rules/gear/equipment/medical/Thermometer.js'
import TransfusionKit from '/src/rules/gear/equipment/medical/TransfusionKit.js'
import WaterFilter from '/src/rules/gear/equipment/medical/WaterFilter.js'

export default {
	name: `Medical`,
	list: [
		Bandage,
		Crutch,
		EMTBag,
		FirstAidKit,
		PressureCuff,
		Stethoscope,
		SurgeryKit,
		Thermometer,
		TransfusionKit,
		WaterFilter,
	]
}