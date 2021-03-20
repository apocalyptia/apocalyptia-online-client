import Ability from '/src/classes/Ability.js'
import Skills from '/src/rules/Skills.js'

const Specialize = new Ability({
	id: ``,
	name: `Specialize`,
	desc: [
		`+1 to a Skill Specialty.`,
	],
	max: 1,
	experience: 3,
	opts: Skills.specs
})

export default Specialize