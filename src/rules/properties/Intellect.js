import Property from '../../classes/Property.js'

const formula = `( Brains + Demeanor ) / 2`

const Intellect = new Property({
	name: `Intellect`,
	formula: formula,
	desc: [
		`Intellect = ${formula}`,
		`Intellect is the amount of XP that is earned automatically for each game session that you survive.`
	],
	type: `Property`
})

export default Intellect
