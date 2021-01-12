import Ability from 'classes/Ability.js'
import SkillsList from 'rules/lists/SkillsList.js'

const Practice = new Ability({
	id: ``,
	name: `Practice`,
	desc: [
		`+1 to a Skill (up to the parent Trait).`,
	],
	max: 1,
	xp: 6,
	opts: SkillsList.list
})

export default Practice