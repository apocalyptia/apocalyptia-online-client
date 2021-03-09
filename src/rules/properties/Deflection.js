import Rule from 'classes/Rule.js'

const Deflection = new Rule({
	name: `Deflection`,
	desc: [
		`Deflection = (Brains + Constitution) / 2.`,
		`This is your default Defense against Melee Attacks when you do not spend and Action to make a Melee(Block) roll.`
	],
	formula: (c) => {
		c.properties.deflection.score = Math.floor((c.traits.brains.score + c.traits.constitution.score) / 2)
		return c
	},
	type: `Property`
})

export default Deflection