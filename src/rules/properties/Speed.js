import Rule from 'classes/Rule.js'

const Speed = new Rule({
	name: `Speed`,
	desc: [
		`Speed = Agility x 3`,
		`This is also the number of yards you can Walk as 1 Action.`,
		`When traveling long distances overland, you can March at [Speed / 2] mph for up to [Constitution x 3] hrs per day.`,
	],
	formula: (c) => {
		c.properties.speed.score = c.traits.agility.score * 3
		return c
	},
	type: `Property`
})

export default Speed