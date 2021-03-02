import Rule from 'classes/Rule.js'

const Intellect = new Rule({
	name: `Intellect`,
	desc: [
		`Intellect = (Brains + Demeanor) / 2`,
		`Intellect is the amount of XP that is earned automatically for each game session that you survive.`,
	],
	formula: (c) => c.properties.intellect.score = Math.floor((c.traits.brains.score + c.traits.demeanor.score) / 2),
	type: `Property`
})

export default Intellect