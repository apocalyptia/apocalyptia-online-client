export class Character {
	constructor() {
		this.scenario = ``,
		this.completed = false,
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
				score: 1,
				set: () => {
					this.traits.agility.score = this.traits.agility.base + this.traits.agility.mods
					return this.traits.agility.score
				},
			},
			brains: {
				name: `Brains`,
				base: 1,
				mods: 0,
				score: 1,
				set: () => {
					this.traits.brains.score =  this.traits.brains.base + this.traits.brains.mods
					return this.traits.brains.score
				},
			},
			constitution: {
				name: `Constitution`,
				base: 1,
				mods: 0,
				score: 1,
				set: () => {
					this.traits.constitution.score = this.traits.constitution.base + this.traits.constitution.mods
					return this.traits.constitution.score
				},
			},
			demeanor: {
				name: `Demeanor`,
				base: 1,
				mods: 0,
				score: 1,
				set: () => {
					this.traits.demeanor.score = this.traits.demeanor.base + this.traits.demeanor.mods
					return this.traits.demeanor.score
				},
			},
		},
		this.skills = {
			acrobatics: {
				name: `Acrobatics`,
				parent: `Agility`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.acrobatics.score = this.skills.acrobatics.base + this.skills.acrobatics.mods
					return this.skills.acrobatics.score
				},
			},
			athletics: {
				name: `Athletics`,
				parent: `Constitution`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.athletics.score = this.skills.athletics.base + this.skills.athletics.mods
					return this.skills.athletics.score
				},
			},
			build: {
				name: `Build`,
				parent: `Brains`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.build.score = this.skills.build.base + this.skills.build.mods
					return this.skills.build.score
				},
			},
			drive: {
				name: `Drive`,
				parent: `Constitution`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.drive.score = this.skills.drive.base + this.skills.drive.mods
					return this.skills.drive.score
				},
			},
			larceny: {
				name: `Larceny`,
				parent: `Agility`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.larceny.score = this.skills.larceny.base + this.skills.larceny.mods
					return this.skills.larceny.score
				},
			},
			leadership: {
				name: `Leadership`,
				parent: `Demeanor`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.leadership.score = this.skills.leadership.base + this.skills.leadership.mods
					return this.skills.leadership.score
				},
			},
			medicine: {
				name: `Medicine`,
				parent: `Brains`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.medicine.score = this.skills.medicine.base + this.skills.medicine.mods
					return this.skills.medicine.score
				},
			},
			melee: {
				name: `Melee`,
				parent: `Constitution`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.melee.score = this.skills.melee.base + this.skills.melee.mods
					return this.skills.melee.score
				},
			},
			perception: {
				name: `Perception`,
				parent: `Brains`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.perception.score = this.skills.perception.base + this.skills.perception.mods
					return this.skills.perception.score
				},
			},
			perform: {
				name: `Perform`,
				parent: `Demeanor`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.perform.score = this.skills.perform.base + this.skills.perform.mods
					return this.skills.perform.score
				},
			},
			ranged: {
				name: `Ranged`,
				parent: `Agility`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.ranged.score = this.skills.ranged.base + this.skills.ranged.mods
					return this.skills.ranged.score
				},
			},
			science: {
				name: `Science`,
				parent: `Brains`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.science.score = this.skills.science.base + this.skills.science.mods
					return this.skills.science.score
				},
			},
			socialize: {
				name: `Socialize`,
				parent: `Demeanor`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.socialize.score = this.skills.socialize.base + this.skills.socialize.mods
					return this.skills.socialize.score
				},
			},
			stealth: {
				name: `Stealth`,
				parent: `Agility`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.stealth.score = this.skills.stealth.base + this.skills.stealth.mods
					return this.skills.stealth.score
				},
			},
			survival: {
				name: `Survival`,
				parent: `Constitution`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.survival.score = this.skills.survival.base + this.skills.survival.mods
					return this.skills.survival.score
				},
			},
			tame: {
				name: `Tame`,
				parent: `Demeanor`,
				base: 0,
				max: 1,
				mods: 0,
				score: 0,
				set: () => {
					this.skills.tame.score = this.skills.tame.base + this.skills.tame.mods
					return this.skills.tame.score
				},
			},
		},
		this.props = {
			block: {
				name: `Block`,
				base: 0,
				mods: 0,
				score: 0,
				set: () => {
					this.props.block.base = this.skills.melee.set()
					this.props.block.score = this.props.block.base + this.props.block.mods
					return this.props.block.score
				}
			},
			dodge: {
				name: `Dodge`,
				base: 0,
				mods: 0,
				score: 0,
				set: () => {
					this.props.dodge.base = this.skills.acrobatics.set()
					this.props.dodge.score = this.props.dodge.base + this.props.dodge.mods
					return this.props.dodge.score
				}
			},
			health: {
				name: `Health`,
				base: 2,
				mods: 0,
				score: 2,
				set: () => {
					this.props.health.base = this.traits.constitution.set() * 3
					this.props.health.score = this.props.health.base + this.props.health.mods
					return this.props.health.score
				}
			},
			init: {
				name: `Initiative`,
				base: 1,
				mods: 0,
				score: 1,
				set: () => {
					this.props.init.base = this.traits.agility.set()
					this.props.init.score = this.props.init.base + this.props.init.mods
					return this.props.init.score
				}
			},
			luck: {
				name: `Luck`,
				base: 1,
				mods: 0,
				score: 1,
				set: () => {
					this.props.luck.base = this.traits.demeanor.set()
					this.props.luck.score = this.props.luck.base + this.props.luck.mods
					return this.props.luck.score
				}
			},
			psyche: {
				name: `Psyche`,
				base: 2,
				mods: 0,
				score: 2,
				set: () => {
					this.props.psyche.base = this.traits.demeanor.set() * 2
					this.props.psyche.score = this.props.psyche.base + this.props.psyche.mods
					return this.props.psyche.score
				}
			},
			speed: {
				name: `Speed`,
				base: 2,
				mods: 0,
				score: 2,
				set: () => {
					this.props.speed.base = this.traits.agility.set() + this.traits.constitution.set()
					this.props.speed.score = this.props.speed.base + this.props.speed.mods
					return this.props.speed.score
				}
			},
			xp: {
				name: `Experience`,
				base: 6,
				mods: 0,
				score: 6,
				set: () => {
					this.props.xp.base = this.traits.brains.set() * 6
					this.props.xp.score = this.props.xp.base + this.props.xp.mods
					return this.props.xp.score
				}
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
	updateProps() {
		let props = Object.keys(this.props)
		props.forEach((prop) => { this.props[prop].set() })
	}
}