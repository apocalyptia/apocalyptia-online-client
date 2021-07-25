import Property from '../../classes/Property.js'

const formula = `Demeanor x 3`

const Psyche = new Property({
	name: `Psyche`,
	formula: formula,
	description: [
		`Psyche = ${formula}`,
		`Psyche is a measure of how much Trauma your mind can withstand.`,
		`Each point of Psyche lost causes a -1 Pain penalty until healed.`,
		`When Psyche drops to 0, you lose all hope and seek out death at the earliest opportunity.`,
		`Someone must protect you from yourself until you have Recovered at least 1 Psyche.`,
	],
	type: `Property`,
})

export default Psyche
