import Property from './Property'


const Intellect = new Property({
	name: `Intellect`,
	desc: [
		`Intellect = Brains`,
		`Intellect is the amount of Experience that is earned automatically for each game session that you survive.`,
	],
	formula: (c) => {
		c.props.intellect.score = c.traits.brains.score
	}
})

export default Intellect