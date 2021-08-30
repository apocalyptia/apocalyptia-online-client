import Property from '../../classes/Property.js'

const formula = `Agility x 3`

const Speed = new Property({
	name: `Speed`,
	formula: formula,
	description: [
		`Speed = ${formula}`,
		`Spend Speed as part of a Movement Action to change your location.`,
		`The distance you can move for the Round depends on your Speed and the type(s) of Movement you are making (see Movement).`,
		`When traveling long distances overland, you can March at [ Speed / 2] mph for up to your Endurance in hours per day.`,
	],
	type: `Property`,
})

export default Speed
