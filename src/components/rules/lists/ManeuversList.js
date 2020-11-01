import DefensiveManeuversList from 'lists/maneuvers/DefensiveManeuversList.js'
import OffensiveManeuversList from 'lists/maneuvers/OffensiveManeuversList.js'
import SocialManeuversList from 'lists/maneuvers/SocialManeuversList.js'

export default {
	name: `Maneuvers`,
	list: [
		...DefensiveManeuversList,
		...OffensiveManeuversList,
		...SocialManeuversList,
	]
}