import Trait from '../../classes/Trait.js'
import Skills from '../Skills.js'

const demeanorSkills = Object.values(Skills).filter((skill) => skill.parent === 'Demeanor')

const Demeanor = new Trait({
	name: `Demeanor`,
	skills: [ ...demeanorSkills ],
	description: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence.`,
		`This Trait is a factor in the Psyche and Luck Properties.`,
		`Demeanor is the parent Trait for the following Skills: ${demeanorSkills.map((skill) => skill.name).join(', ')}.`
	],
	type: `Trait`
})

export default Demeanor
