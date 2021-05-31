import Maneuver from '/src/classes/Maneuver.js'

const Hide = new Maneuver({
	name: `Hide`,
	desc: [`Roll [Stealth vs Perception] to be Concealed.`, `Your Speed is 0.`, `+3 Stealth if Prone.`],
	type: `Defensive`
})

export default Hide
