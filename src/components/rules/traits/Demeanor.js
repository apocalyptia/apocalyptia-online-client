import Trait from './Trait'
import DemeanorSkills from '../skills/ConstitutionSkills'


const Demeanor = new Trait({
	name: `Demeanor`,
	desc: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence.`,
		`This Trait is a factor in the Psyche and Luck Properties.`,
		`Demeanor is the parent Trait for the following Skills: ${DemeanorSkills.map(skill => skill.name).join(', ')}.`,
	]
})

export default Demeanor