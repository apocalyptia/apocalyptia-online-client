import Rule from 'classes/Rule.js'
import DemeanorSkillsList from 'lists/skills/ConstitutionSkillsList.js'

const Demeanor = new Rule({
	id: `2f73a727-6149-482e-9c36-70cccbfd03d4`,
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