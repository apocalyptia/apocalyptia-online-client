import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'
import DescriptionList from 'rules/lists/DescriptionList.js'
import TraitsList from 'rules/lists/TraitsList.js'
import SkillsList from 'rules/lists/SkillsList.js'
import PropertiesList from 'rules/lists/PropertiesList.js'

export default class Character {
	constructor() {
		this.meta = {
			id: ``,
			user: ``,
			created: ``,
			modified: ``,
			notes: ``,
			status: [],
			step: 0,
			proceed: false,
			coordinates: {
				m: ``,
				f: 0,
				x: 0,
				y: 0,
				z: 0
			}
		}
		this.description = {}
		for (let desc of DescriptionList.list) {
			this.description[desc.name.toLowerCase()] = {
				name: desc.name,
				value: ``
			}
		}
		this.traits = {}
		for (let trait of TraitsList.list) {
			this.traits[trait.name.toLowerCase()] = {
				name: trait.name,
				score: 1
			}
		}
		this.skills = {}
		for (let skill of SkillsList.list) {
			this.skills[skill.name.toLowerCase()] = {
				name: skill.name,
				parent: skill.parent,
				score: 0,
				specs: {}
			}
			for (let spec in skill.specs) {
				this.skills[skill.name.toLowerCase()].specs[spec] = {
					name: spec.name,
					score: 0
				}
			}
		}
		this.properties = {}
		for (let prop of PropertiesList.list) {
			this.properties[prop.name.toLowerCase()] = {
				name: prop.name,
				score: 0,
				current: 0
			}
		}
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
		}
		this.abilities = []
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
			for (let d in this.description) {
				if (this.description[d].name != `Player`) this.description[d].value = ``
			}
			return this
		}
		this.resetTraits = _ => {
			for (let t in this.traits) this.traits[t].score = 1
			return this
		}
		this.resetSkills = _ => {
			for (let s in this.skills) this.skills[s].score = 0
			return this
		}
		this.resetAbilities = _ => {
			AbilitiesList.masterList.forEach(a => a.taken = 0)
			return this.updateAbilities()
		}
		this.resetGear = _ => {
			for (let g in this.gear) this.gear[g].inventory = []
			return this
		}
		this.updateAbilities = _ => {
			this.abilities = [...AbilitiesList.masterList.filter(a => a.taken)]
			console.log(`Current XP Pre-Reduce = ${this.properties.experience.current}`)
			this.properties.experience.current = this.abilities.reduce((sum, a) => {
				console.log(`sum = ${sum}`)
				console.log(`a.taken = ${a.taken}`)
				console.log(`a.experience = ${a.experience}`)
				console.log(`a.taken * a.experience = ${a.taken * a.experience}`)
				console.log(`sum - (a.taken * a.experience) = ${sum - (a.taken * a.experience)}`)
				return sum - (a.taken * a.experience)
			}, this.properties.experience.score)
			console.log(`Current XP Post-Reduce = ${this.properties.experience.current}`)
			return this
		}
		this.applyAbilities = _ => {
			for (let a in this.abilities) this.abilities[a].formula(this)
		}
		this.setProperties = _ => {
			for (let p of PropertiesList.list) {
				p.formula(this)
			}
			for (let prop in this.properties) {
				this.properties[prop].current = this.properties[prop].score
			}
			return this
		}
		this.finalize = (userId) => {
			if (!this.created) this.created = new Date()
			this.meta.user = userId
			this.meta.step = this.limit
			this.meta.modified = new Date()
			return this
		}
	}
}