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
				score: 1,
				max: 6
			},
			brains: {
				name: `Brains`,
				score: 1,
				max: 6
			},
			constitution: {
				name: `Constitution`,
				score: 1,
				max: 6
			},
			demeanor: {
				name: `Demeanor`,
				score: 1,
				max: 6
			},
		},
		this.skills = {
			acrobatics: {
				name: `Acrobatics`,
				parent: `Agility`,
				score: 0,
				max: 1
			},
			athletics: {
				name: `Athletics`,
				parent: `Constitution`,
				score: 0,
				max: 1
			},
			build: {
				name: `Build`,
				parent: `Brains`,
				score: 0,
				max: 1
			},
			drive: {
				name: `Drive`,
				parent: `Constitution`,
				score: 0,
				max: 1
			},
			larceny: {
				name: `Larceny`,
				parent: `Agility`,
				score: 0,
				max: 1
			},
			leadership: {
				name: `Leadership`,
				parent: `Demeanor`,
				score: 0,
				max: 1
			},
			medicine: {
				name: `Medicine`,
				parent: `Brains`,
				score: 0,
				max: 1
			},
			melee: {
				name: `Melee`,
				parent: `Constitution`,
				score: 0,
				max: 1
			},
			perception: {
				name: `Perception`,
				parent: `Brains`,
				score: 0,
				max: 1
			},
			perform: {
				name: `Perform`,
				parent: `Demeanor`,
				score: 0,
				max: 1
			},
			ranged: {
				name: `Ranged`,
				parent: `Agility`,
				score: 0,
				max: 1
			},
			science: {
				name: `Science`,
				parent: `Brains`,
				score: 0,
				max: 1
			},
			socialize: {
				name: `Socialize`,
				parent: `Demeanor`,
				score: 0,
				max: 1
			},
			stealth: {
				name: `Stealth`,
				parent: `Agility`,
				score: 0,
				max: 1
			},
			survival: {
				name: `Survival`,
				parent: `Constitution`,
				score: 0,
				max: 1
			},
			tame: {
				name: `Tame`,
				parent: `Demeanor`,
				score: 0,
				max: 1
			},
		},
		this.props = {
			block: {
				name: `Block`,
				score: 0,
				set: () => {
					const block = this.skills.melee.score
					this.props.block.score = block
					return block
				}
			},
			dodge: {
				name: `Dodge`,
				score: 0,
				set: () => {
					const dodge = this.skills.acrobatics.score
					this.props.dodge.score = dodge
					return dodge
				}
			},
			health: {
				name: `Health`,
				score: 3,
				set: () => {
					const health = this.traits.constitution.score * 3
					this.props.health.score = health
					return health
				}
			},
			init: {
				name: `Initiative`,
				score: 1,
				set: () => {
					const init = this.traits.agility.score
					this.props.init.score = init
					return init
				}
			},
			luck: {
				name: `Luck`,
				score: 1,
				set: () => {
					const luck = this.traits[`demeanor`].score
					this.props.luck.score = luck
					return luck
				}
			},
			psyche: {
				name: `Psyche`,
				score: 1,
				set: () => {
					const psyche = this.traits[`demeanor`].score * 3
					this.props.psyche.score = psyche
					return psyche
				}
			},
			reflex: {
				name: `Reflex`,
				score: 0,
				set: () => {
					const reflex = Math.floor(this.skills[`perception`].score / 2)
					this.props.reflex.score = reflex
					return reflex
				}
			},
			speed: {
				name: `Speed`,
				score: 2,
				set: () => {
					const speed = this.traits[`agility`].score + this.traits[`constitution`].score
					this.props.speed.score = speed
					return speed
				}
			},
			xp: {
				name: `Experience`,
				score: 6,
				set: () => {
					const xp = this.traits[`brains`].score * 6
					this.props.xp.score = xp
					return xp
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