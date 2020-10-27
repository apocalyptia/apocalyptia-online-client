import Ability from 'abilities/Ability.js'
import Skills from 'lists/skills/Skills.js'

const EfficientWork = new Ability({
	id: `bc5ad182-ca69-46c9-b013-b92d90d48b07`,
	name: `Efficient Work`,
	desc: [
		`[Time / 2] for a Skill (minimum 1 action).`,
	],
	max: 1,
	xp: 6,
	opts: Skills.list
})

export default EfficientWork