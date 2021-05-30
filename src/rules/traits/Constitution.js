import Rule from '../../classes/Rule.js'
import Skills from '../Skills.js'

const constitutionSkills = Object.values(Skills).filter((skill) => skill.parent === 'Agility')

const Constitution = new Rule({
	name: `Constitution`,
	desc: [
		`Constitution is a Character’s talent for physical power and durability.`,
		`High Constitution indicates good health, high stamina, and strong muscles.`,
		`This Trait is a factor in the Health and Block Properties.`,
		`Constitution is the parent Trait for the following Skills: ${constitutionSkills
			.map((skill) => skill.name)
			.join(', ')}.`
	],
	type: `Trait`
})

export default Constitution
