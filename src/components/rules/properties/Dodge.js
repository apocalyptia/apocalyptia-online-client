import Rule from 'classes/Rule.js'
import Acrobatics from 'skills/Acrobatics.js'

const Dodge = new Rule({
	name: Acrobatics.specs.dodge.name,
	desc: [
		`Dodge = Acrobatics`,
		...Acrobatics.specs.dodge.desc,
	],
	formula: (c) => {
		c.properties.dodge.score = c.skills.acrobatics.score
	},
	type: `Property`
})

export default Dodge