import Rule from 'classes/Rule.js'

const Starvation = new Rule({
	id: `93f70ef3-b00f-4e52-9e11-5225262b27e4`,
	name: `Starvation`,
	desc: [
		`1 Food per day is required.`,
		`1 Pain per week without Food.`,
		`This penalty is reduced by 1 per day with Food.`,
		`Going without Food for a number of weeks = [Constitution] is lethal.`,
	]
})

export default Starvation