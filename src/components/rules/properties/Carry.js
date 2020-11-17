import Rule from 'classes/Rule.js'

const Carry = new Rule({
	name: `Carry`,
	desc: [
		`Carry = Constitution x 3`,
		`1 Pain per Size above Carry.`
	],
	formula: (c) => {
		c.properties.carry.score = c.traits.constitution.score * 3
		if (c.properties.carry.current == null) {
			c.properties.carry.current = 0
		}
	},
	type: `Property`
})

export default Carry