import Ability from '../../classes/Ability'
import Skills from '../Skills'


const EfficientWork = new Ability({
	name: `Efficient Work`,
	desc: [
		`[Time / 2] for a Skill (minimum 1 action).`,
	],
	max: 1,
	xp: 6,
	opts: Skills.list
})

export default EfficientWork