import Trait from '../classes/Trait'
import {
	AgilitySkills,
	BrainsSkills,
	ConstitutionSkills,
	DemeanorSkills
} from './Skills'
import Capitalize from '../helpers/Capitalize'


const AgilitySkillList = AgilitySkills
	.map(skill=> Capitalize(skill.name)).join(', ')

const BrainsSkillList = BrainsSkills
	.map(skill=> Capitalize(skill.name)).join(', ')

const ConstitutionSkillList = ConstitutionSkills
	.map(skill=> Capitalize(skill.name)).join(', ')

const DemeanorSkillList = DemeanorSkills
	.map(skill=> Capitalize(skill.name)).join(', ')


export const traitMax = 6


export const Agility = new Trait({
	name: `agility`,
	description: [
		`Agility is a Character’s talent for physical coordination.`,
		`High Agility indicates balance, flexibility, and fine motor skill.`,
		`This Trait determines the Speed Property.`,
		`Agility is the parent Trait for the following Skills: ${AgilitySkillList}.`,
	]
})

export const Brains = new Trait({
	name: `brains`,
	description: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait determines the Intellect Property.`,
		`Brains is the parent Trait for the following Skills: ${BrainsSkillList}.`,
	]
})

export const Constitution = new Trait({
	name: `constitution`,
	description: [
		`Constitution is a Character’s talent for physical power and durability.`,
		`High Constitution indicates good health, high stamina, and strong muscles.`,
		`This Trait determines the Health Property.`,
		`Constitution is the parent Trait for the following Skills: ${ConstitutionSkillList}.`,
	]
})

export const Demeanor = new Trait({
	name: `demeanor`,
	description: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence.`,
		`This Trait determines the Psyche Property.`,
		`Demeanor is the parent Trait for the following Skills: ${DemeanorSkillList}.`,
	]
})


export const TraitExplanation = (traitPoints) => {
	return `The four Traits range from 1 to 6. You get ${traitPoints} points for Traits. Trait rolls are [d6 + Trait]. Trait scores set the upper limit for their Skills.`
}

export const TraitFlowExplanation = `Once per year (in-game), you may choose to move 1 point from one Trait to another for 30XP. Traits can only be changed by ±1 in this way. Recalculate any associated Properties.`


export default [
	{ ...Agility },
	{ ...Brains },
	{ ...Constitution },
	{ ...Demeanor }
]