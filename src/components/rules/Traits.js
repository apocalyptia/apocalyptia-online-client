import Rule from './Rule'
import {
	AgilitySkills,
	BrainsSkills,
	ConstitutionSkills,
	DemeanorSkills
} from './Skills'


const AgilitySkillList = AgilitySkills.map(skill=> skill.name).join(', ')
const BrainsSkillList = BrainsSkills.map(skill=> skill.name).join(', ')
const ConstitutionSkillList = ConstitutionSkills.map(skill=> skill.name).join(', ')
const DemeanorSkillList = DemeanorSkills.map(skill=> skill.name).join(', ')


export class Trait extends Rule {
	constructor({
		name,
		description
	}) {
		super({
			name,
			description
		})
	}
}


export const traitMax = 6


export const Agility = new Trait({
	name: `Agility`,
	description: [
		`Agility is a Character’s talent for physical coordination.`,
		`High Agility indicates balance, flexibility, and fine motor skill.`,
		`This Trait determines Speed.`,
		`Agility is the parent Trait for the following Skills: ${AgilitySkillList}.`
	]
})

export const Brains = new Trait({
	name: `Brains`,
	description: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait determines Experience.`,
		`Brains is the parent Trait for the following Skills: ${BrainsSkillList}.`
	]
})

export const Constitution = new Trait({
	name: `Constitution`,
	description: [
		`Constitution is a Character’s talent for physical power and durability.`,
		`High Constitution indicates good health and strong muscles.`,
		`This Trait determines Health.`,
		`Constitution is the parent Trait for the following Skills: ${ConstitutionSkillList}.`
	]
})

export const Demeanor = new Trait({
	name: `Demeanor`,
	description: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence. This Trait determines Psyche. Demeanor is also the parent Trait for the following Skills: ${DemeanorSkillList}.`
	]
})


export const TraitExplanation = (traitPoints) => {
	return `The four Traits range from 1 to 6. You get ${traitPoints} points for Traits. Trait rolls are [d6 + Trait]. Trait scores set the upper limit for their Skills.`
}

export const TraitFlowExplanation = `Once per year (in-game), you may choose to move 1 point from one Trait to another for 30XP. Traits can only be changed by ±1 in this way. Recalculate any associated Properties.`


const Traits = [
	Agility,
	Brains,
	Constitution,
	Demeanor
]

export default Traits