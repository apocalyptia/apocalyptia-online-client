import Property from './Property'


const Speed = new Property({
	name: `Speed`,
	desc: [
		`Speed = Agility x 3`,
		`Roll this Property against all other participants at the beginning of each round of combat to determine the order in which turns are resolved.`,
		`This is also the number of yards you can Walk as 1 Action.`,
		`When traveling long distances overland, you can March at [Speed / 2] mph for up to [Constitution x 3] hrs per day.`,
	],
	formula: (c) => {
		c.props.speed.score = c.traits.agility.score * 3
	}
})

export default Speed