import { arrayToObject } from '../../helpers/ArrayToObject'
import Traits from './Traits'
import Skills from './Skills'
import Properties from './Properties'


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
		this.skills = arrayToObject(Skills, `name`),
		this.properties = arrayToObject(Properties, `name`),
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
		if (type == `properties` && stat != `luck`) {
			this[type][stat].base = this[type][stat].formula(this)
		}
		if (stat == `luck`) this.properties.luck.base = 0
		this[type][stat].score = this[type][stat].base + this[type][stat].mods
		return this[type][stat].score
	}
	updateProperties() {
		Object.keys(this.properties).forEach((property) => {
			this.setStat(`properties`, property)
		})
	}
}