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
		this.traits = {
			agility: {
				name: `Agility`,
				base: 1,
				mods: 0,
				score: 1
			},
			brains: {
				name: `Brains`,
				base: 1,
				mods: 0,
				score: 1
			},
			constitution: {
				name: `Constitution`,
				base: 1,
				mods: 0,
				score: 1
			},
			demeanor: {
				name: `Demeanor`,
				base: 1,
				mods: 0,
				score: 1
			},
		},
		this.skills = {
			acrobatics: {
				name: `Acrobatics`,
				parent: `Agility`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			athletics: {
				name: `Athletics`,
				parent: `Constitution`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			build: {
				name: `Build`,
				parent: `Brains`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			drive: {
				name: `Drive`,
				parent: `Constitution`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			larceny: {
				name: `Larceny`,
				parent: `Agility`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			leadership: {
				name: `Leadership`,
				parent: `Demeanor`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			medicine: {
				name: `Medicine`,
				parent: `Brains`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			melee: {
				name: `Melee`,
				parent: `Constitution`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			perception: {
				name: `Perception`,
				parent: `Brains`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			perform: {
				name: `Perform`,
				parent: `Demeanor`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			ranged: {
				name: `Ranged`,
				parent: `Agility`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			science: {
				name: `Science`,
				parent: `Brains`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			socialize: {
				name: `Socialize`,
				parent: `Demeanor`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			stealth: {
				name: `Stealth`,
				parent: `Agility`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			survival: {
				name: `Survival`,
				parent: `Constitution`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
			tame: {
				name: `Tame`,
				parent: `Demeanor`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0
			},
		},
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
			luck: {
				name: `Luck`,
				base: 0,
				mods: 0,
				score: 0,
				formula: () => this.properties.luck.base
			},
			mentalHealth: {
				name: `Psyche`,
				base: 3,
				mods: 0,
				score: 3,
				formula: () => this.traits.demeanor.score * 3
			},
			physicalHealth: {
				name: `Health`,
				base: 3,
				mods: 0,
				score: 3,
				formula: () => this.traits.constitution.score * 3
			},
			speed: {
				name: `Speed`,
				base: 3,
				mods: 0,
				score: 3,
				formula: () => this.traits.agility.score * 3
			},
			xp: {
				name: `Experience`,
				base: 3,
				mods: 0,
				score: 3,
				formula: () => this.traits.brains.score * 3
			},
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