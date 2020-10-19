import Rule from 'rules/Rule.js'


const Burning = new Rule({
	id: `fdd9257e-9937-4786-a6b0-eb77c39ba7f4`,
	name: `Burning`,
	desc: [
		`1 Fire Damage per round.`,
		`It takes a d6 rounds to stop, drop Prone, and roll Survival 6# to put out the flames.`,
	]
})

export default Burning