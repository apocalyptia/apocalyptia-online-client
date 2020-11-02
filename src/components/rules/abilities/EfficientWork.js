import Ability from 'classes/Ability.js'
import SkillsList from 'lists/SkillsList.js'

const EfficientWork = new Ability({
	name: `Efficient Work`,
	desc: [
		`[Time / 2] for a Skill (minimum 1 action).`,
	],
	max: 1,
	xp: 6,
	opts: SkillsList.list
})

export default EfficientWork