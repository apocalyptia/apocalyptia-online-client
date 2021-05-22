import InitializeDescription from '/src/classes/methods/creation/InitializeDescription.js'
import InitializeGear from '/src/classes/methods/creation/InitializeGear.js'
import InitializeMeta from '/src/classes/methods/creation/InitializeMeta.js'
import InitializeProperties from '/src/classes/methods/creation/InitializeProperties.js'
import InitializeSkills from '/src/classes/methods/creation/InitializeSkills.js'
import InitializeTraits from '/src/classes/methods/creation/InitializeTraits.js'
import RandomAge from '/src/utils/random/description/RandomAge.js'
import RandomAmmo from '/src/utils/random/gear/RandomAmmo.js'
import RandomArmor from '/src/utils/random/gear/RandomArmor.js'
import RandomEquipment from '/src/utils/random/gear/RandomEquipment.js'
import RandomHair from '/src/utils/random/description/RandomHair.js'
import RandomHeight from '/src/utils/random/description/RandomHeight.js'
import RandomMeleeWeapon from '/src/utils/random/gear/RandomMeleeWeapon.js'
import RandomName from '/src/utils/random/description/RandomName.js'
import RandomNumber from '/src/utils/random/dice/RandomNumber.js'
import RandomProjectileWeapon from '/src/utils/random/gear/RandomProjectileWeapon.js'
import RandomRoll from '/src/utils/random/dice/RandomRoll.js'
import RandomSex from '/src/utils/random/description/RandomSex.js'
import RandomSkin from '/src/utils/random/description/RandomSkin.js'
import RandomWeight from '/src/utils/random/description/RandomWeight.js'
import runFormula from '/src/utils/api/runFormula.js'


export default class Character {
	constructor(rules) {
		this.meta = InitializeMeta(rules)
		this.description = InitializeDescription(rules)
		this.traits = InitializeTraits(rules)
		this.skills = InitializeSkills(rules)
		this.properties = InitializeProperties(rules)
		this.abilities = []
		this.gear = InitializeGear()

		this.stepLimit = rules.creation.steps.length - 1,
		this.maxTraits = rules.creation.maxTraits,
		this.proceed = false,
		this.startingSkillsMultiplier = rules.creation.startingSkillsMultiplier,
		this.startingTraits = rules.creation.startingTraits,
		this.step = 0,
		this.traitsRemaining = rules.creation.startingTraits,
		this.skillsRemaining = parseInt(rules.creation.startingSkillsMultiplier),
		this.canProceed = () => {
			switch (this.step) {
				case 0:
					this.proceed = true
					return this.remainingTraits() === 0
				case 1:
					this.proceed = true
					return this.remainingSkills() === 0
				case 3:
					this.proceed = true
					return this.properties.experience.current >= 0
				case 4:
					this.proceed = true
					return Object.values(this.gear).every(g => g.inventory.length)
				case 5:
					this.proceed = true
					return Object.values(this.description).every(d => d.value)
				default:
					this.proceed = true
					return true
			}
		},
		this.remainingTraits = () => {
			const spentTraitPoints = Object.values(this.traits).map(t => t.score).reduce((sum, t) => sum + t, 0)
			const remainingTraits = this.startingTraits - spentTraitPoints
			this.traitsRemaining = remainingTraits
			return remainingTraits
		},
		this.remainingSkills = () => {
			const spentSkillPoints = Object.values(this.skills).map(s => s.score).reduce((sum, s) => sum + s, 0)
			this.startingSkills = this.traits.brains.score * parseInt(this.startingSkillsMultiplier)
			const remainingSkills = this.startingSkills - spentSkillPoints
			this.skillsRemaining = remainingSkills
			return remainingSkills
		},
		this.remainingExperience = () => {
			return
		}

		this.resetGear = () => {
			for (const g in this.gear) {
				this.gear[g].inventory = []
			}
		},
		this.resetAbilities = () => {
			this.abilities = []
			this.updateProperties()
			this.resetGear()
		},
		this.resetDescription = () => {
			for (const d in this.description) {
				if (this.description[d].name != `Player`) {
					this.description[d].value = ``
				}
			}
		},
		this.resetProperties = () => {
			for (const p in this.properties) {
				if (p === `health`) {
					for (const h in this.health) {
						if (h === `torso`) {
							this.health[h].current = this.traits.constitution.score * 2
							this.health[h].score = this.traits.constitution.score * 2
						}
						else {
							this.health[h].current = this.traits.constitution.score
							this.health[h].score = this.traits.constitution.score
						}
						this.health[h]
					}
				} else {
					this.properties[p].current = 0
					this.properties[p].score = 0
				}
			}
			this.updateProperties()
			this.resetAbilities()
		},
		this.resetSkills = () => {
			for (const s in this.skills) {
				this.skills[s].score = 0
			}
			this.remainingSkills()
		},
		this.resetTraits = () => {
			for (const t in this.traits) {
				this.traits[t].score = 1
			}
			this.remainingTraits()
			this.resetSkills()
		}

		this.updateAbilities = (ability) => {
			if (ability) {
				this.abilities.push(ability)
				this.updateProperties()
			}
			// TODO: Ability formulas need work...
			// for (const a in this.abilities) {
			// 	if (a.formula) a.formula()
			// }
		},
		this.updateProperties = () => {
			for (const p in this.properties) {
				if (p === 'health') {
					for (const l of Object.keys(this.properties[p].locations)) {
						this.properties.health.locations[l].score = runFormula(
							this,
							'traits',
							rules.list.properties.health.locations[l].formula
						)
						this.properties.health.locations[l].current = this.properties.health.locations[l].score
					}
				} else {
					this.properties[p].score = runFormula(
						this,
						'traits',
						rules.list.properties[p].formula
					)
					this.properties[p].current = this.properties[p].score
				}
			}
			this.properties.experience.current = this.abilities.reduce((sum, a) => {
				return sum - (a.qty * a.experience)
			}, this.properties.experience.score)
		},
		this.updateSkill = (skill) => {
			const skillKey = skill.name.toLowerCase()
			const parentKey = this.skills[skillKey].parent.toLowerCase()
			this.skills[skillKey].score = parseInt(skill.score)
			this.remainingSkills()
			while (
				this.skillsRemaining < 0 ||
				(this.skills[skillKey].score > this.traits[parentKey].score)
			) {
				this.skills[skillKey].score--
				this.remainingSkills()
			}
			this.proceed = this.canProceed()
		},
		this.updateTrait = (trait) => {
			const traitKey = trait.name.toLowerCase()
			this.traits[traitKey].score = parseInt(trait.score)
			this.remainingTraits()
			while(this.traitsRemaining < 0) {
				this.traits[traitKey].score--
				this.remainingTraits()
			}
			this.resetSkills()
			this.updateProperties()
			this.remainingSkills()
			this.proceed = this.canProceed()
		}

		this.randomDescription = (category) => {
			switch (category) {
				case 'Age':
					this.description.age.value = RandomAge()
					break
				case 'Hair':
					this.description.hair.value = RandomHair(
						this.description.age.value,
						this.description.sex.value,
						this.description.skin.value
					)
					break
				case 'Height':
					this.description.height.value = RandomHeight(this.description.sex.value)
					break
				case 'Name':
					this.description.name.value = RandomName(this.description.sex.value)
					break
				case 'Sex':
					this.description.sex.value = RandomSex()
					break
				case 'Skin':
					this.description.skin.value = RandomSkin()
					break
				case 'Weight':
					this.description.weight.value = RandomWeight(
						this.description.height.value,
						this.description.sex.value
					)
					break
				case 'All':
					this.description.age.value = RandomAge()
					this.description.sex.value = RandomSex()
					this.description.skin.value = RandomSkin()
					this.description.name.value = RandomName(this.description.sex.value)
					this.description.height.value = RandomHeight(this.description.sex.value)
					this.description.weight.value = RandomWeight(
						this.description.height.value,
						this.description.sex.value
					)
					this.description.hair.value = RandomHair(
						this.description.age.value,
						this.description.sex.value,
						this.description.skin.value
					)
			}
			this.proceed = this.canProceed()
		},
		this.randomTraits = () => {
			this.resetTraits()
			while(this.traitsRemaining) {
				const traitName = RandomRoll(Object.keys(this.traits))
				if (this.traits[traitName].score < this.maxTraits) {
					this.traits[traitName].score++
				}
				this.remainingTraits()
			}
			for (const trait of Object.values(this.traits)) {
				this.updateTrait(trait)
			}
		},
		this.randomSkills = () => {
			this.resetSkills()
			while(this.skillsRemaining) {
				const skillName = RandomRoll(Object.keys(this.skills))
				const parentKey = this.skills[skillName].parent.toLowerCase()
				const parentScore = this.traits[parentKey].score
				if (this.skills[skillName].score < parentScore) {
					this.skills[skillName].score++
				}
				this.remainingSkills()
			}
			for (const skill of Object.values(this.skills)) {
				this.updateSkill(skill)
			}
		},
		this.randomAbilities = () => {
			this.resetAbilities()
			while (this.properties.experience.current > 0) {
				const remainingAbilities = Object.values(rules.list.abilities).filter(r => {
					return (
						!this.abilities.some(a => a.name === r.name) &&
						r.experience <= this.properties.experience.current						
					)
				})
				if (remainingAbilities.length) {
					const randomAbility = RandomRoll(remainingAbilities)
					randomAbility.qty = 1
					if (randomAbility.options.length) {
						randomAbility.selection = RandomNumber(randomAbility.options.length)
					}
					this.updateAbilities(randomAbility)
				}
				else break
			}
		},
		this.randomGear = () => {
			this.resetGear()
			this.gear.armor.inventory.push(RandomArmor())
			this.gear.melee.inventory.push(RandomMeleeWeapon())
			this.gear.projectile.inventory.push(RandomProjectileWeapon())
			this.gear.ammo.inventory.push(
				RandomAmmo({
					caliber: this.gear.projectile.inventory[0].cal,
					max: 6
				})
			)
			this.gear.equipment.inventory = [
				...RandomEquipment({
					numberOfItems: this.properties.luck.current
				})
			]
			const food = rules.list.gear.resources.food
			food.qty = 1
			this.gear.equipment.inventory.push(food)
			const waterBottle = rules.list.gear.storage.waterbottle
			waterBottle.qty = 1
			this.gear.equipment.inventory.push(waterBottle)
			const water = rules.list.gear.resources.water
			water.qty = 1
			this.gear.equipment.inventory.push(water)
		},
		this.randomCharacter = () => {
			this.randomDescription()
			this.randomTraits()
			this.randomSkills()
			this.updateProperties()
			this.randomAbilities()
			this.randomGear()
			this.step = this.stepLimit
		}

		this.finalize = (userId) => {
			if (!this.meta.created) this.meta.created = new Date()
			this.meta.user = userId
			this.meta.modified = new Date()
		}

		console.log(this)
	}
}