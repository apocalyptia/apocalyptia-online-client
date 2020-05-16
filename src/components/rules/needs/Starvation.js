import Rule from '../../rules/Rule'


const Starvation = new Rule({
	name: `Starvation`, 
	desc: [
		`1 Food per day is required.`,
		`1 Pain per week without Food.`,
		`This penalty is reduced by 1 per day with Food.`,
		`Going without Food for a number of weeks = [Constitution] is lethal.`,
	]
})

export default Starvation