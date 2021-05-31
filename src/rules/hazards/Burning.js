import Hazard from '/src/classes/Hazard.js'

const Burning = new Hazard({
	name: `Burning`,
	desc: [
		`1 Fire Damage per round.`,
		`It takes a d6 rounds to stop, drop Prone, and roll Demeanor 6# to put out the flames.`
	],
	type: `Hazard`
})

export default Burning
