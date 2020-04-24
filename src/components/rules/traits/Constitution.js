import Trait from '../../classes/Trait'
import { ConstitutionSkills } from './Skills'

const ConstitutionSkillList = ConstitutionSkills.map(skill => skill.name).join(', ')

export const constitution = new Trait({
	name: `Constitution`,
	desc: [
		`Constitution is a Character’s talent for physical power and durability.`,
		`High Constitution indicates good health, high stamina, and strong muscles.`,
		`This Trait is a factor in the Health and Block Properties.`,
		`Constitution is the parent Trait for the following Skills: ${ConstitutionSkillList}.`,
	]
})