import Rule from '/src/classes/Rule.js'
import DemeanorSkillsList from '/src/rules/lists/skills/ConstitutionSkillsList.js'

const Demeanor = new Rule({
	name: `Demeanor`,
	desc: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence.`,
		`This Trait is a factor in the Psyche and Luck Properties.`,
		`Demeanor is the parent Trait for the following Skills: ${DemeanorSkillsList.map(skill => skill.name).join(', ')}.`,
	],
	type: `Trait`
})

export default Demeanor