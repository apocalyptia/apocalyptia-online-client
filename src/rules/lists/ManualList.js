import AbilitiesList from '/src/rules/lists/abilities/AbilitiesList.js'
import CombatList from '/src/rules/lists/CombatList.js'
import CoreList from '/src/rules/lists/CoreList.js'
import GearList from '/src/rules/lists/gear/GearList.js'
import HazardsList from '/src/rules/lists/HazardsList.js'
import ManeuversList from '/src/rules/lists/ManeuversList.js'
import NeedsList from '/src/rules/lists/NeedsList.js'
import PropertiesList from '/src/rules/lists/PropertiesList.js'
import SkillsList from '/src/rules/lists/SkillsList.js'
import StatusList from '/src/rules/lists/StatusList.js'
import TraitsList from '/src/rules/lists/TraitsList.js'

export default {
	name: `Manual`,
	list: [
		AbilitiesList,
		CombatList,
		CoreList,
		GearList,
		HazardsList,
		ManeuversList,
		NeedsList,
		PropertiesList,
		SkillsList,
		StatusList,
		TraitsList,
	]
}