import DefensiveManeuvers from './defensive/DefensiveManeuvers'
import OffensiveManeuvers from './offensive/OffensiveManeuvers'
import SocialManeuvers from './social/SocialManeuvers'


export default {
	name: `Maneuvers`,
	list: [
		...DefensiveManeuvers,
		...OffensiveManeuvers,
		...SocialManeuvers,
	]
}