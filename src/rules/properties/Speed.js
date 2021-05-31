import Property from '../../classes/Property.js'

const formula = `Agility x 3`

const Speed = new Property({
	name: `Speed`,
	formula: formula,
	desc: [
		`Speed = ${formula}`,
		`This determines the distance you can travel as a Movement Action.`,
		`When traveling long distances overland, you can March at [Speed / 2] mph for up to your Endurance in hours per day.`,
	],
	type: `Property`
})

export default Speed
