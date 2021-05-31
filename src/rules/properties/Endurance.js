import Property from '../../classes/Property.js'

const formula = `Constitution x 3`

const Endurance = new Property({
	name: `Endurance`,
	formula: formula,
	desc: [
		`Endurance = ${formula}`,
		`Taking an Action costs 1 Endurance.`,
		`For every Round in which you do not take any Actions, you regain Endurance equal to your Fitness score.`,
		`Endurance is also the maximum amount of total Size you can carry comfortably.`,
		`1 Pain per Size carried beyond your current Endurance.`
	],
	type: `Property`
})

export default Endurance
