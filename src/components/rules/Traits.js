import Trait from '../classes/Trait'
import {
	AgilitySkills,
	BrainsSkills,
	ConstitutionSkills,
	DemeanorSkills
} from './Skills'
import Properties from './Properties'
import RandomRoll from '../functions/Random'

export const traitMax = 6

export const traitPoints = 14

export const TraitsExplanation = [
	`Traits range from 1 to ${traitMax}.`,
	`You get ${traitPoints} points for Traits.`,
	`Trait rolls are [d6 + Trait].`,
	`Trait scores set the upper limit for their Skills.`
]

const AgilitySkillList = AgilitySkills.map(skill => skill.name).join(', ')

const BrainsSkillList = BrainsSkills.map(skill => skill.name).join(', ')

const ConstitutionSkillList = ConstitutionSkills.map(skill => skill.name).join(', ')

const DemeanorSkillList = DemeanorSkills.map(skill => skill.name).join(', ')

export const agility = new Trait({
	name: `Agility`,
	description: [
		`Agility is a Character’s talent for physical coordination.`,
		`High Agility indicates balance, flexibility, and fine motor skill.`,
		`This Trait is a factor in the Speed and Dodge Properties.`,
		`Agility is the parent Trait for the following Skills: ${AgilitySkillList}.`,
	]
})

export const brains = new Trait({
	name: `Brains`,
	description: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait is a factor in the Experience and Intellect Properties.`,
		`Brains is the parent Trait for the following Skills: ${BrainsSkillList}.`,
	]
})

export const constitution = new Trait({
	name: `Constitution`,
	description: [
		`Constitution is a Character’s talent for physical power and durability.`,
		`High Constitution indicates good health, high stamina, and strong muscles.`,
		`This Trait is a factor in the Health and Block Properties.`,
		`Constitution is the parent Trait for the following Skills: ${ConstitutionSkillList}.`,
	]
})

export const demeanor = new Trait({
	name: `Demeanor`,
	description: [
		`Demeanor is a Character’s talent for social exchanges and sheer force of will.`,
		`High Demeanor indicates charisma, self-motivation, and confidence.`,
		`This Trait is a factor in the Psyche and Luck Properties.`,
		`Demeanor is the parent Trait for the following Skills: ${DemeanorSkillList}.`,
	]
})

export const TraitFlowExplanation = `Once per year (in-game), you may choose to move 1 point from one Trait to another for 30XP. Traits can only be changed by ±1 in this way. ResetScores any associated Properties.`

export default {
	explanation: TraitsExplanation,
	list: [
		{ ...agility },
		{ ...brains },
		{ ...constitution },
		{ ...demeanor },
	],
	max: traitMax,
	startingPoints: traitPoints,
	assign: function(c, t, v){
		c.traits[t].base = parseInt(v)
		this.limit(c, t)
	},
	limit: function(c, t){
		while (this.remaining(c) < 0) c.traits[t].base--
		console.log(c.traits[t].base)
		this.setScores(c)
	},
	random: function(c){
		this.reset(c)
		while(this.remaining(c) > 0) {
			let t = RandomRoll(Object.keys(c.traits))
			if (c.traits[t].base < this.max) c.traits[t].base++
		}
		this.setScores(c)
	},
	remaining: function(c){
		return this.startingPoints -
			Object.values(c.traits).reduce(
				(t, { base }) => t += base, 0
			)
	},
	reset: function(c){
		Object.keys(c.traits).forEach(
			t => c.traits[t].base = 1
		)
	},
	setScores: function(c){
		Object.keys(c.traits).forEach(t => {
			c.traits[t].score = c.traits[t].base + c.traits[t].mods
		})
	}
}