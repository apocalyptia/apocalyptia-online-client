import Hazard from '$classes/Hazard.js'

const Burning = new Hazard({
	name: `Burning`,
	description: [
		`1 Fire Damage per Round.`,
		`It takes a d6 rounds to stop, drop Prone, and roll Demeanor 6# to put out the flames.`
	],
})

export default Burning
