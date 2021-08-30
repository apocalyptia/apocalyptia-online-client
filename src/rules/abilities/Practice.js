import Ability from '/src/classes/Ability.js'
import Skills from '../Skills.js'

const Practice = new Ability({
	name: `Practice`,
	description: [`+1 to a Skill (up to the parent Trait).`],
	max: 1,
	experience: 6,
	options: [...Object.values(Skills).map((skill) => skill.name) ],
})

export default Practice
