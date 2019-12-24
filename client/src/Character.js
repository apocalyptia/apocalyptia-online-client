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
				max: 6,
				mods: 0,
				score: 1,
				set: () => {
					this.traits.agility.score = this.traits.agility.base + this.traits.agility.mods
				},
			},
			brains: {
				name: `Brains`,
				base: 1,
				max: 6,
				mods: 0,
				score: 1,
				set: () => {
					this.traits.brains.score =  this.traits.brains.base + this.traits.brains.mods
				},
			},
			constitution: {
				name: `Constitution`,
				base: 1,
				max: 6,
				mods: 0,
				score: 1,
				set: () => {
					this.traits.constitution.score = this.traits.constitution.base + this.traits.constitution.mods
				},
			},
			demeanor: {
				name: `Demeanor`,
				base: 1,
				max: 6,
				mods: 0,
				score: 1,
				set: () => {
					this.traits.demeanor.score = this.traits.demeanor.base + this.traits.demeanor.mods
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
					this.props.block.base = this.skills.melee.set
					this.props.block.score = this.props.block.base + this.props.block.mods
				}
			},
			dodge: {
				name: `Dodge`,
				base: 0,
				mods: 0,
				score: 0,
				set: () => {
					this.props.dodge.base = this.skills.acrobatics.set
					this.props.dodge.score = this.props.dodge.base + this.props.dodge.mods
				}
			},
			health: {
				name: `Health`,
				base: 2,
				mods: 0,
				score: 2,
				set: () => {
					this.props.health.base = this.traits.constitution.set * 2
					this.props.health.score = this.props.health.base + this.props.health.mods
				}
			},
			init: {
				name: `Initiative`,
				base: 1,
				mods: 0,
				score: 1,
				set: () => {
					this.props.init.base = this.traits.agility.set
					this.props.init.score = this.props.init.base + this.props.init.mods
				}
			},
			luck: {
				name: `Luck`,
				base: 1,
				mods: 0,
				score: 1,
				set: () => {
					this.props.luck.base = this.traits.demeanor.set
					this.props.luck.score = this.props.luck.base + this.props.luck.mods
				}
			},
			psyche: {
				name: `Psyche`,
				base: 2,
				mods: 0,
				score: 2,
				set: () => {
					this.props.psyche.base = this.traits.demeanor.set * 2
					this.props.psyche.score = this.props.psyche.base + this.props.psyche.mods
				}
			},
			reflex: {
				name: `Reflex`,
				base: 0,
				mods: 0,
				score: 0,
				set: () => {
					this.props.reflex.base = Math.floor(this.skills.perception.set / 2)
					this.props.reflex.score = this.props.reflex.base + this.props.reflex.mods
				}
			},
			speed: {
				name: `Speed`,
				base: 2,
				mods: 0,
				score: 2,
				set: () => {
					this.props.speed.base = this.traits.agility.set + this.traits.constitution.set
					this.props.speed.score = this.props.speed.base + this.props.speed.mods
				}
			},
			xp: {
				name: `Experience`,
				base: 6,
				mods: 0,
				score: 6,
				set: () => {
					this.props.xp.base = this.traits.brains.set * 6
					this.props.xp.score = this.props.xp.base + this.props.xp.mods
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
		console.log('props updated')
		let props = Object.keys(this.props)
		props.forEach((prop) => { this.props[prop].set })
	}
}