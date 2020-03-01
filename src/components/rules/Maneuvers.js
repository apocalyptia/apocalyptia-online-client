import DefensiveManeuvers from './maneuvers/DefensiveManeuvers'
import OffensiveManeuvers from './maneuvers/OffensiveManeuvers'
import SocialManeuvers from './maneuvers/SocialManeuvers'


export default {
	list: [
		...DefensiveManeuvers,
		...OffensiveManeuvers,
		...SocialManeuvers
	]
}