import Rule from '../../rules/Rule'


const Burning = new Rule({
	name: `Burning`, 
	desc: [
		`1 Fire Damage per round.`,
		`It takes a d6 rounds to stop, drop Prone, and roll Survival 6# to put out the flames.`,
	]
})

export default Burning