import Rule from '../../classes/Rule.js'

const Burning = new Rule({
	name: `Burning`,
	desc: [
		`1 Fire Damage per round.`,
		`It takes a d6 rounds to stop, drop Prone, and roll Demeanor 6# to put out the flames.`
	],
	type: `Hazard`
})

export default Burning
