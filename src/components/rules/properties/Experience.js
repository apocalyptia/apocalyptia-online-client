import Property from './Property'


const Experience = new Property({
	name: `Experience`,
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
		c.props.experience.score = c.traits.brains.score * 3
		c.props.experience.current = c.traits.brains.score * 3
	}
})

export default Experience