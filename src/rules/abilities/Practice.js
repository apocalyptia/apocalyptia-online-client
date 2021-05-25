import Ability from '../../classes/Ability.js' 
import Skills from '../Skills.js' 

const Practice = new Ability({
	name: `Practice`,
	desc: [
		`+1 to a Skill (up to the parent Trait).`,
	],
	max: 1,
	experience: 6,
	options: Object.values(Skills).map(s => s.name)
})

export default Practice