import Property from '../../classes/Property.js'

const formula = `Agility x 3`

const Speed = new Property({
	name: `Speed`,
	formula: formula,
	desc: [
		`Speed = ${formula}`,
		`This is also the number of yards you can Walk as 1 Action.`,
		`When traveling long distances overland, you can March at [Speed / 2] mph for up to [Constitution x 3] hrs per day.`
	],
	type: `Property`
})

export default Speed
