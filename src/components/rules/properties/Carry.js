import Property from './Property'


const Carry = new Property({
	id: `c35b76a8-9912-46fc-b1d3-b0b23b71ef3d`,
	name: `Carry`,
	desc: [
		`Carry = Constitution x 3`,
		`1 Pain per Size above Carry.`
	],
	formula: (c) => {
		c.props.carry.current = 0
		c.props.carry.score = c.traits.constitution.score * 3
	},
	base: 3,
	score: 3
})

export default Carry