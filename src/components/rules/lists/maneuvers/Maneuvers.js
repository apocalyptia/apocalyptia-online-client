import DefensiveManeuvers from 'lists/maneuvers/DefensiveManeuvers.js'
import OffensiveManeuvers from 'lists/maneuvers/OffensiveManeuvers.js'
import SocialManeuvers from 'lists/maneuvers/SocialManeuvers.js'


export default {
	name: `Maneuvers`,
	list: [
		...DefensiveManeuvers,
		...OffensiveManeuvers,
		...SocialManeuvers,
	]
}