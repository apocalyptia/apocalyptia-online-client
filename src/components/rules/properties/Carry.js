import Rule from 'classes/Rule.js'

const Carry = new Rule({
	name: `Carry`,
	desc: [
		`Carry = Constitution x 3`,
		`1 Pain per Size above Carry.`
	],
	formula: (c) => {
		c.props.carry.current = 0
		c.props.carry.score = c.traits.constitution.score * 3
	},
	type: `Property`
})

export default Carry