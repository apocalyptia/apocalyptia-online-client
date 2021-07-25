import Ability from '/src/classes/Ability.js'
import Skills from '../Skills.js'

const Specialize = new Ability({
	name: `Specialize`,
	description: [`+1 to a Skill Specialty.`],
	max: 1,
	experience: 3,
	options: [
		...Object.values(Skills)
			.map((skill) => Object.values(skill.specialties).map((specialty) => specialty.name))
			.flat(),
	],
})

export default Specialize
