import Property from 'rules/properties/Property.js'


const Intellect = new Property({
	id: `99433632-a504-4529-8e11-e9b9d56ec532`,
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