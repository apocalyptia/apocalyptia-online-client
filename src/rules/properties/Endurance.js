import Rule from '/src/classes/Rule.js'

const Endurance = new Rule({
	name: `Endurance`,
	desc: [
		`Endurance = Constitution x 3`,
		`Taking any number of Actions in a round (up to a maximum of 3 Actions) costs 1 Endurance for the round.`,
		`For every round in which you do not take any Actions, you regain Endurance equal to your Fitness score.`,
		`This is also the maximum amount of total Size you can move with comfortably.`,
		`1 Pain per Size carried beyond your current Endurance.`,
	],
	formula: (c) => {
		c.properties.endurance.score = c.traits.constitution.score * 3
		return c
	},
	type: `Property`
})

export default Endurance