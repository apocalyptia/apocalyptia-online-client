import Rule from '/src/classes/Rule.js'

const Fitness = new Rule({
	name: `Fitness`,
	desc: [
		`Fitness = (Agility + Constitution) / 2`,
		`This is the rate at which Endurance is regained during rounds where you do not take any Actions.`,
	],
	formula: (c) => {
		c.properties.fitness.score = Math.floor((c.traits.agility.score + c.traits.constitution.score) / 2)
		return c
	},
	type: `Property`
})

export default Fitness