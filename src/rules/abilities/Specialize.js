import Ability from 'classes/Ability.js'
import Skills from 'rules/Skills.js'

const Specialize = new Ability({
	id: ``,
	name: `Specialize`,
	desc: [
		`+1 to a Skill Specialty.`,
	],
	max: 1,
	xp: 3,
	opts: Skills.specs
})

export default Specialize