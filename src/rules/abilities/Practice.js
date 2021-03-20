import Ability from '/src/classes/Ability.js'
import SkillsList from '/src/rules/lists/SkillsList.js'

const Practice = new Ability({
	id: ``,
	name: `Practice`,
	desc: [
		`+1 to a Skill (up to the parent Trait).`,
	],
	max: 1,
	experience: 6,
	opts: SkillsList.list
})

export default Practice