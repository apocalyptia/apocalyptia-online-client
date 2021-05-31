import Maneuver from '/src/classes/Maneuver.js'

const Sneak = new Maneuver({
	name: `Sneak`,
	desc: [`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`],
	type: `Defensive`
})

export default Sneak
