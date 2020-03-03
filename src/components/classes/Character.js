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
			startingTraits: Traits.startingPoints
		},
		this.description = ArrayToObject(Descriptions.list, `name`),
		this.traits = ArrayToObject(Traits.list, `name`),
		this.skills = ArrayToObject(Skills.list, `name`),
		this.properties = ArrayToObject(Properties.list, `name`),
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
		if (type == `properties`) {
			this[type][stat].base = this[type][stat].formula(this)
		}
		this[type][stat].score = this[type][stat].base + this[type][stat].mods
		return this[type][stat].score
	}
	updateProperties() {
		Object.keys(this.properties).forEach((property) => {
			this.setStat(`properties`, property)
		})
	}
	spentXP() {
		let spent = 0
		if (this.abilities.length) {
			spent = this.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
		}
		return spent
	}
	remainingXP() {
		const remaining = this.properties.experience.score - this.spentXP()
		return remaining
	}
}