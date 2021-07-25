import Property from '../../classes/Property.js'

const formula = `Constitution x 3`

const Endurance = new Property({
	name: `Endurance`,
	formula: formula,
	description: [
		`Endurance = ${formula}`,
		`Taking any Action costs 1 Endurance unless otherwise noted.`,
		`For every Round in which you do not take an Action, you regain Endurance equal to your Fitness score.`,
		`Your current Endurance is also the maximum amount of total Size you can carry comfortably.`,
		`You take 1 Pain penalty per Size carried beyond your current Endurance.`,
	],
	type: `Property`,
})

export default Endurance
