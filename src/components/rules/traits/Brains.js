import Trait from '../../classes/Trait'
import { BrainsSkills } from './Skills'

const BrainsSkillList = BrainsSkills.map(skill => skill.name).join(', ')

export const brains = new Trait({
	name: `Brains`,
	desc: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait is a factor in the Experience and Intellect Properties.`,
		`Brains is the parent Trait for the following Skills: ${BrainsSkillList}.`,
	]
})