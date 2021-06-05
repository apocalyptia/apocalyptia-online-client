import Property from '../../classes/Property.js'

const formula = `( Constitution + Demeanor ) / 2`

const Discipline = new Property({
	name: `Discipline`,
	formula: formula,
	description: [
		`Discipline = ${formula}.`,
		`This is the amount of Pain you can ignore before you start taking a Pain penalty.`,
		`Each point of Pain beyond your Discipline score adds to your Pain penalty.`
	],
	type: `Property`
})

export default Discipline
