import Rule from 'classes/Rule.js'

const Intellect = new Rule({
	name: `Intellect`,
	desc: [
		`Intellect = Brains`,
		`Intellect is the amount of Experience that is earned automatically for each game session that you survive.`,
	],
	formula: (c) => {
		c.props.intellect.score = c.traits.brains.score
	},
	type: `Property`
})

export default Intellect