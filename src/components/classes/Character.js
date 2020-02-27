import ArrayToObject from '../functions/ArrayToObject'
import Descriptions from '../rules/Descriptions'
import Traits from '../rules/Traits'
import Skills from '../rules/Skills'
import Properties from '../rules/Properties'

export default class Character {
	constructor() {
		this.completed = false,
		this.options = {
			scenario: ``,
			startingTraits: 14
		},
		this.description = ArrayToObject(Descriptions, `name`),
		this.traits = ArrayToObject(Traits, `name`),
		this.skills = ArrayToObject(Skills, `name`),
		this.properties = ArrayToObject(Properties, `name`),
		this.abilities = [],
		this.gear = {
			armor: {
				name: `Armor`,
				inventory: []
			},
			meleeWeapons: {
				name: `Melee Weapons`,
				inventory: []
			},
			rangedWeapons: {
				name: `Ranged Weapons`,
				inventory: []
			},
			ammo: {
				name: `Ammo`,
				inventory: []
			},
			backpack: {
				name: `Backpack`,
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
	spentXP() {
		this.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
	}
	remainingXP() {
		this.properties.experience.score - this.spentXP()
	}
}