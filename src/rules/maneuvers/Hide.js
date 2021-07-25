import Maneuver from '/src/classes/Maneuver.js'

const Hide = new Maneuver({
	name: `Hide`,
	description: [`Roll [Stealth vs Perception] to be Concealed.`, `Your Speed is 0.`, `+3 Stealth if Prone.`],
	mode: `Defensive`,
})

export default Hide
