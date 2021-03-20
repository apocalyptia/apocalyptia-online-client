import DefensiveManeuversList from '/src/rules/lists/maneuvers/DefensiveManeuversList.js'
import OffensiveManeuversList from '/src/rules/lists/maneuvers/OffensiveManeuversList.js'
import SocialManeuversList from '/src/rules/lists/maneuvers/SocialManeuversList.js'

export default {
	name: `Maneuvers`,
	list: [
		...DefensiveManeuversList,
		...OffensiveManeuversList,
		...SocialManeuversList,
	]
}