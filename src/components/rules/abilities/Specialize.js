import Ability from '../../classes/Ability'
import Skills from '../Skills'


const Specialize = new Ability({
	name: `Specialize`,
	desc: [
		`+1 to a Skill Specialty.`,
	],
	max: 1,
	xp: 3,
	opts: Skills.specs
})

export default Specialize