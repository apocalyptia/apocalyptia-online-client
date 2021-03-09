import Rule from 'classes/Rule.js'

const Evasion = new Rule({
	name: `Evasion`,
	desc: [
		`Evasion = (Agility + Brains) / 2.`,
		`This is your default Defense against Ranged Attacks when you do not spend and Action to make an Acrobatics(Dodge) roll.`
	],
	formula: (c) => {
		c.properties.evasion.score = Math.floor((c.traits.agility.score + c.traits.brains.score) / 2)
		return c
	},
	type: `Property`
})

export default Evasion