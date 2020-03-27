import Property from '../classes/Property'
import { Block, Dodge } from './maneuvers/DefensiveManeuvers'

export const PropertyExplanation = [
	`Properties represent a variety of attributes that are derived from a Character's Traits and Skills.`
]

export const block = new Property({
	name: `Block`,
	description: [
		`Block = Melee`,
		...Block.description,
	],
	formula: (character) => character.skills.melee.score,
	base: 0,
	score: 0
})

export const dodge = new Property({
	name: `Dodge`,
	description: [
		`Dodge = Acrobatics`,
		...Dodge.description,
	],
	formula: (character) => character.skills.acrobatics.score,
	base: 0,
	score: 0
})

export const health = new Property({
	name: `Health`,
	description: [
		`Health = Constitution x 3`,
		`Health is a measure of how many Wounds you can withstand.`,
		`Damage is the cause of most Wounds.`,
		`You start Bleeding 1 Wound/min when you have Wounds = [Constitution].`,
		`The rate of Bleeding increases to 1 Wound/round and you fall Unconscious when you have Wounds = [Constitution x 2].`,
		`You die when you have Wounds = [Constitution x 3].`,
	],
	formula: (character) => character.traits.constitution.score * 3,
	base: 3,
	score: 3
})

export const experience = new Property({
	name: `Experience`,
	description: [
		`Experience (XP) = Brains x 3`,
		`Experience represents how much you have learned up to now.`,
		`You get additional XP = Intellect for each game session you survive.`,
		`You also get +1 XP every time you roll a Botch.`,
		`The Narrator may choose to give bonus XP.`,
		`You may spend XP to buy Abilities to improve your Character.`,
		`You may also spend 1XP per round to regain 1 Luck Point.`,
	],
	formula: (character) => character.traits.brains.score * 3,
	base: 3,
	score: 3
})

export const intellect = new Property({
	name: `Intellect`,
	description: [
		`Intellect = Brains`,
		`Intellect is the amount of Experience that is earned automatically for each game session that you survive.`,
	],
	formula: (character) => character.traits.brains.score,
	base: 1,
	score: 1
})

export const luck = new Property({
	name: `Luck`,
	description: [
		`Luck = Demeanor`,
		`Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance.`,
		`You may spend 1 Luck Point per round in a dramatic moment for one of the three effects listed below.`,
		`You regain 1 spent Luck Point at dawn each day.`,
		`• Re-roll the last die you rolled with a +6 bonus.`,
		`• Take an extra Action on your turn.`,
		`• Give a Luck point to a Comrade.`,
	],
	formula: (character) => character.traits.demeanor.score,
	base: 1,
	score: 1
})

export const psyche = new Property({
	name: `Psyche`,
	description: [
		`Psyche = Demeanor x 3`,
		`This is a measure of how much Trauma you can withstand.`,
		`Any number of horrible events can cause Trauma.`,
		`When Trauma = [Demeanor x 3] you lose all hope and seek out death at the earliest opportunity, unless someone can restrain you until you have Recovered from at least 1 Trauma.`,
	],
	formula: (character) => character.traits.demeanor.score * 3,
	base: 3,
	score: 3
})

export const speed = new Property({
	name: `Speed`,
	description: [
		`Speed = Agility x 3`,
		`Roll this Property against all other participants at the beginning of each round of combat to determine the order in which turns are resolved.`,
		`This is also the number of yards you can Walk as 1 Action.`,
		`When traveling long distances overland, you can March at [Speed / 2] mph for up to [Constitution x 3] hrs per day.`,
	],
	formula: (character) => character.traits.agility.score * 3,
	base: 3,
	score: 3
})

export const PropertyList = [
	block,
	dodge,
	experience,
	health,
	intellect,
	luck,
	psyche,
	speed,
]

export default {
	name: `Properties`,
	explanation: PropertyExplanation,
	list: PropertyList,
	setScores: function(c) {
		Object.keys(c.properties).forEach((p, i) => {
			if (c.properties[p].name == this.list[i].name) {
				c.properties[p].score = this.list[i].formula(c)
			}
		})
		return c
	}
}