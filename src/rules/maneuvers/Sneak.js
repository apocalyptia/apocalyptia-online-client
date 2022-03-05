import Maneuver from '$classes/Maneuver.js'

const Sneak = new Maneuver({
	name: `Sneak`,
	description: [`Roll [ Stealth vs Perception ] to move Concealed at [ Speed / 2 ].`],
	mode: `Defensive`,
})

export default Sneak
