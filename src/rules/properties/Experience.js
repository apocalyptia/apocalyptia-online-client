import Property from '../../classes/Property.js'

const formula = `Brains x 3`

const Experience = new Property({
	name: `Experience`,
	formula: formula,
	description: [
		`Experience Points (XP) = ${formula}`,
		`XP represents how much you have learned up to now.`,
		`You get additional XP = Intellect for each game session you survive.`,
		`You also get +1 XP every time you roll a Botch.`,
		`The Narrator may choose to give bonus XP at Character Creation or during the Campaign as they wish.`,
		`You may spend XP to buy Abilities to improve your Character.`,
		`You may also spend 1XP per Round to regain 1 Luck Point up to a maximum of your Luck score.`,
	],
	type: `Property`,
})

export default Experience
