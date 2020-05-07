import DefensiveManeuvers from './defensive/DefensiveManeuvers'
import OffensiveManeuvers from './offensive/OffensiveManeuvers'
import SocialManeuvers from './social/SocialManeuvers'


const ManeuversList = [
	...DefensiveManeuvers,
	...OffensiveManeuvers,
	...SocialManeuvers,
]

export default ManeuversList