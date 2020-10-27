import Stat from 'rules/Stat.js'
import DemeanorSkills from 'lists/skills/ConstitutionSkills.js'

const Demeanor = new Stat({
	id: `2f73a727-6149-482e-9c36-70cccbfd03d4`,
	name: `Demeanor`,
	desc: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence.`,
		`This Trait is a factor in the Psyche and Luck Properties.`,
		`Demeanor is the parent Trait for the following Skills: ${DemeanorSkills.map(skill => skill.name).join(', ')}.`,
	]
})

export default Demeanor