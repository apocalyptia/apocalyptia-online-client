import Rule from '/src/classes/Rule.js'

const Health = new Rule({
	name: `Health`,
	desc: [
		`Head, Arm, and Leg Health = Constitution`,
		`Torso Health = Constitution x 2`,
		`Health is a measure of how much Damage your body can withstand.`,
	],
	formula: (c) => {
		for (let location in c.health) {
			if (c.health[location].name == `Torso`) c.health[location].score = c.traits.constitution.score * 2
			else c.health[location].score = c.traits.constitution.score
		}
		return c
	},
	type: `Property`
})

export default Health