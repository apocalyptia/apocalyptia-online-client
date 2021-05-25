import Ability from '../../classes/Ability.js' 
import Skills from '../Skills.js' 

const Specialize = new Ability({
	name: `Specialize`,
	desc: [
		`+1 to a Skill Specialty.`,
	],
	max: 1,
	experience: 3,
	options: Object.values(Skills).map(spec => {
		return Object.values(spec.specs).map(s => s.name)
	}).flat()
})

export default Specialize