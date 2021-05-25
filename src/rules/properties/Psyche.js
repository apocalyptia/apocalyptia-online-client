import Property from '../../classes/Property.js' 

const formula = `Demeanor x 3`

const Psyche = new Property({
	name: `Psyche`,
	formula: formula,
	desc: [
		`Psyche = ${formula}`,
		`Psyche is a measure of how much Trauma your mind can withstand.`,
	],
	type: `Property`
})

export default Psyche