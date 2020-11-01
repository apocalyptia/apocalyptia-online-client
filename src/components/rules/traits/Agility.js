import Rule from 'classes/Rule.js'
import AgilitySkillsList from 'lists/skills/AgilitySkillsList.js'

const Agility = new Rule({
	id: `c84ca95a-9f01-476f-897c-e6ad07231551`,
	name: `Agility`,
	desc: [
		`Agility is a Character’s talent for physical coordination.`,
		`High Agility indicates balance, flexibility, and fine motor skill.`,
		`This Trait is a factor in the Speed and Dodge Properties.`,
		`Agility is the parent Trait for the following Skills: ${AgilitySkillsList.map(skill => skill.name).join(', ')}.`,
	],
	type: `Trait`
})

export default Agility