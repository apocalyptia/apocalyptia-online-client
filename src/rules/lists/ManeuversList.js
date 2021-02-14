import DefensiveManeuversList from 'rules/lists/maneuvers/DefensiveManeuversList.js'
import OffensiveManeuversList from 'rules/lists/maneuvers/OffensiveManeuversList.js'
import SocialManeuversList from 'rules/lists/maneuvers/SocialManeuversList.js'

export default {
	name: `Maneuvers`,
	list: [
		...DefensiveManeuversList,
		...OffensiveManeuversList,
		...SocialManeuversList,
	]
}