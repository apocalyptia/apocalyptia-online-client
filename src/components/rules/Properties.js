import Property from '../classes/Property'
import { acrobatics, melee } from './Skills'

export const PropertyExplanation = [
	`Properties represent a variety of attributes that are derived from a Character's Traits and Skills.`
]

export const block = new Property({
	name: melee.specialties.block.name,
	description: [
		`Block = Melee`,
		...melee.specialties.block.description,
	],
	formula: (c) => {
		c.properties.block.score = c.skills.melee.score
	},
	base: 0,
	score: 0
})

export const carry = new Property({
	name: `Carry`,
	description: [
		`Carry = Constitution x 3`,
		`1 Pain per Size above Carry.`
	],
	formula: (c) => {
		c.properties.carry.current = 0
		c.properties.carry.score = c.traits.constitution.score * 3
	},
	base: 3,
	score: 3
})

export const dodge = new Property({
	name: acrobatics.specialties.dodge.name,
	description: [
		`Dodge = Acrobatics`,
		...acrobatics.specialties.dodge.description,
	],
	formula: (c) => {
		c.properties.dodge.score = c.skills.acrobatics.score
	}
})

export const health = new Property({
	name: `Health`,
	description: [
		`There are 6 body Locations, each with its own Health.`,
		`Torso Health = Constitution x 2`,
		`Head, Arm, and Leg Health = Constitution`,
		`Health is a measure of how much Damage you can withstand.`,
		`You fall Unconscious when you have taken total Damage = Constitution x 2.`,
		`You die when Head or Torso Health = 0.`,
	],
	formula: (c) => {
		Object.values(c.health).forEach((h) => {
			if (h.name == `Torso`) {
				h.score = c.traits.constitution.score * 2
				h.current = c.traits.constitution.score * 2
			}
			else {
				h.score = c.traits.constitution.score
				h.current = c.traits.constitution.score
			}
		})
	}
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
	formula: (c) => {
		c.properties.experience.score = c.traits.brains.score * 3
		c.properties.experience.current = c.traits.brains.score * 3
	}
})

export const intellect = new Property({
	name: `Intellect`,
	description: [
		`Intellect = Brains`,
		`Intellect is the amount of Experience that is earned automatically for each game session that you survive.`,
	],
	formula: (c) => {
		c.properties.intellect.score = c.traits.brains.score
	}
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
	formula: (c) => {
		c.properties.luck.score = c.traits.demeanor.score
		c.properties.luck.current = c.traits.demeanor.score
	}
})

export const psyche = new Property({
	name: `Psyche`,
	description: [
		`Psyche = Demeanor x 3`,
		`This is a measure of how much Trauma you can withstand.`,
		`Any number of horrible events can cause Trauma.`,
		`When Trauma = [Demeanor x 3] you lose all hope and seek out death at the earliest opportunity.`,
		`Someone must protect you from yourself until you have Recovered from at least 1 Trauma.`,
	],
	formula: (c) => {
		c.properties.psyche.score = c.traits.demeanor.score * 3
		c.properties.psyche.current = c.traits.demeanor.score * 3
	}
})

export const speed = new Property({
	name: `Speed`,
	description: [
		`Speed = Agility x 3`,
		`Roll this Property against all other participants at the beginning of each round of combat to determine the order in which turns are resolved.`,
		`This is also the number of yards you can Walk as 1 Action.`,
		`When traveling long distances overland, you can March at [Speed / 2] mph for up to [Constitution x 3] hrs per day.`,
	],
	formula: (c) => {
		c.properties.speed.score = c.traits.agility.score * 3
	}
})

export const PropertyList = [
	block,
	carry,
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
		this.list.forEach(p => p.formula(c))
		return c
	}
}