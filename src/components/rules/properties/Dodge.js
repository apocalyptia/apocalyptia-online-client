import Rule from 'classes/Rule.js'
import Acrobatics from 'skills/Acrobatics.js'

const Dodge = new Rule({
	id: `c83be9cc-03c9-4b19-85d2-8a2e89475848`,
	name: Acrobatics.specs.dodge.name,
	desc: [
		`Dodge = Acrobatics`,
		...Acrobatics.specs.dodge.desc,
	],
	formula: (c) => {
		c.props.dodge.score = c.skills.acrobatics.score
	},
	type: `Property`
})

export default Dodge