import { arrayToObject } from '../../helpers/ArrayToObject'
import Skills from './Skills'
import Traits from './Traits'


export class Character {
	constructor() {
		this.completed = false,
		this.options = {
			scenario: ``,
			startingTraits: 14
		},
		this.description = {
			age: {
				label: `Age`,
				value: ``
			},
			characterName: {
				label: `Character`,
				value: ``
			},
			gender: {
				label: `Gender`,
				value: ``
			},
			hair: {
				label: `Hair`,
				value: ``
			},
			height: {
				label: `Height`,
				value: ``
			},
			playerName: {
				label: `Player`,
				value: ``
			},
			skin: {
				label: `Skin`,
				value: ``
			},
			weight: {
				label: `Weight`,
				value: ``
			},
		},
		this.traits = arrayToObject(Traits, `name`),
		this.skills = arrayToObject(Skills, `name`)
		this.properties = {
			block: {
				name: `Block`,
				base: 0,
				mods: 0,
				score: 0,
				formula: () => this.skills.melee.score
			},
			dodge: {
				name: `Dodge`,
				base: 0,
				mods: 0,
				score: 0,
				formula: () => this.skills.acrobatics.score
			},
			health: {
				name: `Health`,
				base: 3,
				mods: 0,
				score: 3,
				formula: () => this.traits.constitution.score * 3
			},
			experience: {
				name: `Experience`,
				base: 3,
				mods: 0,
				score: 3,
				formula: () => this.traits.brains.score * 3
			},
			intellect: {
				name: `Intellect`,
				base: 1,
				mods: 0,
				score: 1,
				formula: () => this.traits.brains.score
			},
			luck: {
				name: `Luck`,
				base: 0,
				mods: 0,
				score: 0,
				formula: () => this.properties.luck.base
			},
			psyche: {
				name: `Psyche`,
				base: 3,
				mods: 0,
				score: 3,
				formula: () => this.traits.demeanor.score * 3
			},
			speed: {
				name: `Speed`,
				base: 3,
				mods: 0,
				score: 3,
				formula: () => this.traits.agility.score * 3
			}
		},
		this.abilities = [],
		this.gear = {
			armor: {
				name: `Armor`,
				inventory: []
			},
			weapons: {
				name: `Weapons`,
				inventory: []
			},
			backpack: {
				name: `Backpack`,
				inventory: []
			},
			ammo: {
				name: `Ammo`,
				inventory: []
			},
		}
	}
	setStat(type, stat) {
		if (type == 'properties') this[type][stat].base = this[type][stat].formula()
		this[type][stat].score = this[type][stat].base + this[type][stat].mods
		return this[type][stat].score
	}
	updateProperties() {
		let properties = Object.keys(this.properties)
		properties.forEach((property) => this.setStat('properties', property))
	}
}