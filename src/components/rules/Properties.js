import Rule from './Rule'
import { Block, Dodge } from './Maneuvers'


export class Property extends Rule {
	constructor({
		name,
		description,
		formula
	}) {
		super({
			name,
			description
		})
		this.formula = formula
	}
}


export const BlockDefense = new Property({
	name: `Block`,
	description: [ ...Block.description ],
	formula: `melee`
})

export const DodgeDefense = new Property({
	name: `Dodge`,
	description: [ ...Dodge.description ],
	formula: `acrobatics`
})

export const Experience = new Property({
	name: `Experience`,
	description: [
		`[B per session] XP is earned once per game session. +1 XP every time you roll a Botch. The GN may give bonus XP. Spend XP to buy Abilities.`
	],
	formula: `brains * 3`
})

export const Luck = new Property({
	name: `Luck`,
	description: [
		`Roll a d6 during Character Creation to determine your Luck. Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance. Luck points refill at dawn each day. You may spend Luck in dramatic moments to:`,
		`• Take a re-roll with a +6 bonus.`,
		`• Take an extra Action.`,
		`• Give a Luck point to a Comrade.`
	],
	formula: `d6`
})

export const MentalHealth = new Property({
	name: `Psyche`,
	description: [
		`[D x 3]. This is a measure of how much Trauma you can withstand. Any number of horrible events can cause Trauma. When Trauma = [D x 3] you lose all hope and seek out death at the earliest opportunity, unless someone can restrain you until you have Recovered from at least 1 Trauma.`
	],
	formula: `demeanor * 3`
})

export const PhysicalHealth = new Property({
	name: `Health`,
	description: [
		`[C x 3]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding 1 Wound/min when you have Wounds = [C]. The rate of Bleeding increases to 1 Wound/rnd and you fall Unconscious when you have Wounds = [C x 2]. You die when you have Wounds = [C x 3].`
	],
	formula: `constitution * 3`
})

export const Speed = new Property({
	name: `Speed`,
	description: [
		`[A x 3]. This the Property that is rolled against all other participants at the beginning of each round of combat to determine the order in which each participant's turn is resolved. This is also a Character's personal Walking rate in yards per round at the cost of 1 Action. Characters can travel long distances overland at [Speed / 2] mph for up to [C x 3] hrs per day.`
	],
	formula: `agility * 3`
})


export const Properties = [
	BlockDefense,
	DodgeDefense,
	Experience,
	Luck,
	MentalHealth,
	PhysicalHealth,
	Speed
]


export const PropertyExplanation = `Properties represent a variety of attributes that are derived from a Character's Traits and Skills.`