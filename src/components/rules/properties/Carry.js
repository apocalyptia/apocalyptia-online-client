import Property from './Property'


const Carry = new Property({
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