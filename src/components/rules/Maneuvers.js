import DefensiveManeuvers from './maneuvers/DefensiveManeuvers'
import OffensiveManeuvers from './maneuvers/OffensiveManeuvers'
import SocialManeuvers from './maneuvers/SocialManeuvers'


export default {
	name: `Maneuvers`,
	list: [
		...DefensiveManeuvers,
		...OffensiveManeuvers,
		...SocialManeuvers
	]
}