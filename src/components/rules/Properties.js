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

export const Health = new Property({
	name: `Health`,
	description: [
		`[C x 3]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding 1 Wound/min when you have Wounds = [C]. The rate of Bleeding increases to 1 Wound/rnd and you fall Unconscious when you have Wounds = [C x 2]. You die when you have Wounds = [C x 3].`
	],
	formula: `constitution * 3`
})

export const Experience = new Property({
	name: `Experience`,
	description: [
		`[B x 6] starting. Experience represents how much you have learned up to now. You accumulate additional Experience Points ("XP") = [Intellect] for each game session that you survive. You also get +1 XP every time you roll a Botch. The Narrator may also give bonus XP. You may spend your XP to buy Abilities to permanently improve your character. You may also spend 1XP per round to regain 1 Luck Point.`
	],
	formula: `brains * 3`
})

export const Intellect = new Property({
	name: `Intellect`,
	description: [
		`XP = [B] is earned automatically for each game session that you survive.`
	],
	formula: `brains`
})

export const Luck = new Property({
	name: `Luck`,
	description: [
		`Roll a d6 during Character Creation to determine your Luck. Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance. You may spend Luck Points in dramatic moments for various effects listed below. You may only spend 1 Luck Point per round. You regain 1 spent Luck Point at dawn each day. Spend a Luck Point to get one of the following effects:`,
		`• Take a re-roll with a +6 bonus.`,
		`• Take an extra Action on your turn.`,
		`• Give a Luck point to a Comrade.`
	],
	formula: `d6`
})

export const Psyche = new Property({
	name: `Psyche`,
	description: [
		`[D x 3]. This is a measure of how much Trauma you can withstand. Any number of horrible events can cause Trauma. When Trauma = [D x 3] you lose all hope and seek out death at the earliest opportunity, unless someone can restrain you until you have Recovered from at least 1 Trauma.`
	],
	formula: `demeanor * 3`
})

export const Speed = new Property({
	name: `Speed`,
	description: [
		`[A x 3]. This the Property that is rolled against all other participants at the beginning of each round of combat to determine the order in which each participant's turn is resolved. This is also a Character's personal Walking rate in yards per round at the cost of 1 Action. Characters can travel long distances overland at [Speed / 2] mph for up to [C x 3] hrs per day.`
	],
	formula: `agility * 3`
})


export const PropertyExplanation = `Properties represent a variety of attributes that are derived from a Character's Traits and Skills.`


const Properties = [
	BlockDefense,
	DodgeDefense,
	Intellect,
	Luck,
	Psyche,
	Health,
	Speed
]

export default Properties