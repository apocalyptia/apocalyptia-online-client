import Rule from 'classes/Rule.js'

const XP = new Rule({
	name: `XP`,
	desc: [
		`Experience (XP) = Brains x 3`,
		`Experience represents how much you have learned up to now.`,
		`You get additional XP = Intellect for each game session you survive.`,
		`You also get +1 XP every time you roll a Botch.`,
		`The Narrator may choose to give bonus XP.`,
		`You may spend XP to buy Abilities to improve your Character.`,
		`You may also spend 1XP per round to regain 1 Luck Point.`,
	],
	formula: (c) => {
		c.properties.xp.score = c.traits.brains.score * 3
		if (c.properties.xp.current == null) {
			c.properties.xp.current = c.traits.brains.score * 3
		}
	},
	type: `Property`
})

export default XP