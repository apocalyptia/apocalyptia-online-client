import AbilitiesList from '$rules/lists/abilities/AbilitiesList.js'
import CombatList from '$rules/lists/CombatList.js'
import CoreList from '$rules/lists/CoreList.js'
import GearList from '$rules/lists/gear/GearList.js'
import HazardsList from '$rules/lists/HazardsList.js'
import ManeuversList from '$rules/lists/ManeuversList.js'
import NeedsList from '$rules/lists/NeedsList.js'
import PropertiesList from '$rules/lists/PropertiesList.js'
import SkillsList from '$rules/lists/SkillsList.js'
import StatusList from '$rules/lists/StatusList.js'
import TraitsList from '$rules/lists/TraitsList.js'

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