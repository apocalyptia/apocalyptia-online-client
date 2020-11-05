import AbilitiesList from 'lists/AbilitiesList.js'
import PropertiesList from 'lists/PropertiesList.js'

export default class Character {
	constructor() {
		this.meta = {
			id: ``,
			user: ``,
			created: ``,
			modified: ``,
			notes: ``,
			coordinates: {
				map: ``,
				x: 0,
				y: 0
			},
			status: {
				completed: false,
				open: false,
				step: 0,
			}
		},
		this.description = {
			age: {
				name: `Age`,
				value: ``
			},
			name: {
				name: `Name`,
				value: ``
			},
			hair: {
				name: `Hair`,
				value: ``
			},
			height: {
				name: `Height`,
				value: ``
			},
			sex: {
				name: `Sex`,
				value: ``
			},
			skin: {
				name: `Skin`,
				value: ``
			},
			weight: {
				name: `Weight`,
				value: ``
			}
		},
		this.traits = {
			agility: {
				name: `Agility`,
				score: 1
			},
			brains: {
				name: `Brains`,
				score: 1
			},
			constitution: {
				name: `Constitution`,
				score: 1
			},
			demeanor: {
				name: `Demeanor`,
				score: 1
			}
		},
		this.skills = {
			acrobatics: {
				name: `Acrobatics`,
				score: 0,
				parent: 'Agility'
			},
			larceny: {
				name: `Larceny`,
				score: 0,
				parent: 'Agility'
			},
			ranged: {
				name: `Ranged`,
				score: 0,
				parent: 'Agility'
			},
			stealth: {
				name: `Stealth`,
				score: 0,
				parent: 'Agility'
			},
			medicine: {
				name: `Medicine`,
				score: 0,
				parent: 'Brains'
			},
			perception: {
				name: `Perception`,
				score: 0,
				parent: 'Brains'
			},
			science: {
				name: `Science`,
				score: 0,
				parent: 'Brains'
			},
			survival: {
				name: `Survival`,
				score: 0,
				parent: 'Brains'
			},
			athletics: {
				name: `Athletics`,
				score: 0,
				parent: 'Constitution'
			},
			build: {
				name: `Build`,
				score: 0,
				parent: 'Constitution'
			},
			drive: {
				name: `Drive`,
				score: 0,
				parent: 'Constitution'
			},
			melee: {
				name: `Melee`,
				score: 0,
				parent: 'Constitution'
			},
			leadership: {
				name: `Leadership`,
				score: 0,
				parent: 'Demeanor'
			},
			perform: {
				name: `Perform`,
				score: 0,
				parent: 'Demeanor'
			},
			socialize: {
				name: `Socialize`,
				score: 0,
				parent: 'Demeanor'
			},
			tame: {
				name: `Tame`,
				score: 0,
				parent: 'Demeanor'
			}
		},
		this.properties = {
			block: {
				name: `Block`,
				score: 0
			},
			carry: {
				name: `Carry`,
				score: 6,
				current: 0
			},
			dodge: {
				name: `Dodge`,
				score: 0
			},
			experience: {
				name: `Experience`,
				score: 3,
				current: 0
			},
			intellect: {
				name: `Intellect`,
				score: 1
			},
			luck: {
				name: `Luck`,
				score: 1,
				current: 1
			},
			psyche: {
				name: `Psyche`,
				score: 3,
				current: 3
			},
			speed: {
				name: `Speed`,
				score: 3
			}
		},
		this.health = {
			head: {
				name: `Head`,
				score: 3,
				current: 3
			},
			rightArm: {
				name: `Right Arm`,
				score: 3,
				current: 3
			},
			leftArm: {
				name: `Left Arm`,
				score: 3,
				current: 3
			},
			torso: {
				name: `Torso`,
				score: 6,
				current: 6
			},
			leftLeg: {
				name: `Left Leg`,
				score: 3,
				current: 3
			},
			rightLeg: {
				name: `Right Leg`,
				score: 3,
				current: 3
			},
		},
		this.abilities = [],
		this.gear = {
			armor: {
				name: `Armor`,
				inventory: []
			},
			melee: {
				name: `Melee Weapons`,
				inventory: []
			},
			ranged: {
				name: `Ranged Weapons`,
				inventory: []
			},
			ammo: {
				name: `Ammo`,
				inventory: []
			},
			equipment: {
				name: `Equipment`,
				inventory: []
			},
		}
		this.resetDescription = _ => {
			for (let d in this.desc) {
				this.description[d].value = ``
			}
			return this
		}
		this.resetTraits = _ => {
			for (let t in this.traits) {
				this.traits[t].score = 1
			}
			return this
		}
		this.resetSkills = _ => {
			for (let s in this.skills) {
				this.skills[s].score = 0
			}
			return this
		}
		this.setProperties = _ => {
			for (let p of PropertiesList.list) {
				p.formula(this)
			}
			return this
		}
		this.resetGear = _ => {
			for (let g in this.gear) {
				this.gear[g].inventory = []
			}
			return this
		}
		this.updateAbilities = _ => {
			this.abilities = AbilitiesList.masterList.filter(a => a.taken)
			this.properties.experience.current = this.properties.experience.score
			if (this.abilities.length) {
				this.abilities.forEach(a => this.properties.experience.current -= (a.taken * a.xp))
			}
			return this
		}
		this.finalize = (userId) => {
			if (!this.created) this.created = new Date()
			this.meta.user = userId
			this.meta.status.step = 6
			this.meta.status.completed = true
			this.meta.modified = new Date()
			return this
		}
	}
}