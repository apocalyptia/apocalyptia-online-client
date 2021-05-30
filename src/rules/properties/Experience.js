import Property from '../../classes/Property.js'

const formula = `Brains x 3`

const Experience = new Property({
	name: `Experience`,
	formula: formula,
	desc: [
		`Experience Points (XP) = ${formula}`,
		`XP represents how much you have learned up to now.`,
		`You get additional XP = Intellect for each game session you survive.`,
		`You also get +1 XP every time you roll a Botch.`,
		`The Narrator may choose to give bonus XP.`,
		`You may spend XP to buy Abilities to improve your Character.`,
		`You may also spend 1XP per round to regain 1 Luck Point.`
	],
	type: `Property`
})

export default Experience
