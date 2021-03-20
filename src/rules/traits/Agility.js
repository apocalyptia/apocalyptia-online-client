import Rule from '/src/classes/Rule.js'
import AgilitySkillsList from '/src/rules/lists/skills/AgilitySkillsList.js'

const Agility = new Rule({
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