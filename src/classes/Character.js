import Abilities from '/src/rules/Abilities.js'
import Creation from '/src/rules/Creation.js'
import Gear from '/src/rules/Gear.js'
import Properties from '/src/rules/Properties.js'
import initializeDescription from '/src/classes/methods/creation/initializeDescription.js'
import initializeGear from '/src/classes/methods/creation/initializeGear.js'
import initializeMeta from '/src/classes/methods/creation/initializeMeta.js'
import initializeProperties from '/src/classes/methods/creation/initializeProperties.js'
import initializeSkills from '/src/classes/methods/creation/initializeSkills.js'
import initializeTraits from '/src/classes/methods/creation/initializeTraits.js'
import randomAge from '/src/utils/random/description/randomAge.js'
import randomAmmo from '/src/utils/random/gear/randomAmmo.js'
import randomArmor from '/src/utils/random/gear/randomArmor.js'
import randomEquipment from '/src/utils/random/gear/randomEquipment.js'
import randomHair from '/src/utils/random/description/randomHair.js'
import randomHeight from '/src/utils/random/description/randomHeight.js'
import randomMeleeWeapon from '/src/utils/random/gear/randomMeleeWeapon.js'
import randomName from '/src/utils/random/description/randomName.js'
import randomNumber from '/src/utils/random/dice/randomNumber.js'
import randomProjectileWeapon from '/src/utils/random/gear/randomProjectileWeapon.js'
import randomRoll from '/src/utils/random/dice/randomRoll.js'
import randomSex from '/src/utils/random/description/randomSex.js'
import randomSkin from '/src/utils/random/description/randomSkin.js'
import randomWeight from '/src/utils/random/description/randomWeight.js'
import runFormula from '/src/utils/runFormula.js'

export default class Character {
	constructor() {
		this.meta = initializeMeta(),
		this.description = initializeDescription(),
		this.traits = initializeTraits(),
		this.skills = initializeSkills(),
		this.properties = initializeProperties(),
		this.abilities = [],
		this.gear = initializeGear(),
		this.maxTraits = parseInt(Creation.traits.max),
		this.proceed = false,
		this.skillsRemaining = parseInt(Creation.skills.startingMultiplier),
		this.startingSkillsMultiplier = parseInt(Creation.skills.startingMultiplier),
		this.startingTraits = parseInt(Creation.traits.starting),
		this.traitsRemaining = parseInt(Creation.traits.starting),

		this.canProceed = (step) => {
			switch (step) {
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
					return Object.values(this.gear).every((g) => g.inventory.length)
				case 5:
					this.proceed = true
					return Object.values(this.description).every((d) => d.value)
				default:
					this.proceed = true
					return true
			}
		},
		this.remainingTraits = () => {
			const spentTraitPoints = Object.values(this.traits)
				.map((t) => t.score)
				.reduce((sum, t) => sum + t, 0)
			const remainingTraits = this.startingTraits - spentTraitPoints
			this.traitsRemaining = remainingTraits
			return remainingTraits
		},
		this.remainingSkills = () => {
			const spentSkillPoints = Object.values(this.skills)
				.map((s) => s.score)
				.reduce((sum, s) => sum + s, 0)
			this.startingSkills = this.traits.brains.score * this.startingSkillsMultiplier
			const remainingSkills = this.startingSkills - spentSkillPoints
			this.skillsRemaining = remainingSkills
			return remainingSkills
		},
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
						} else {
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
		},
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
							Properties.health.locations[l].formula
						)
						this.properties.health.locations[l].current = this.properties.health.locations[l].score
					}
				} else {
					this.properties[p].score = runFormula(this, 'traits', Properties[p].formula)
					this.properties[p].current = this.properties[p].score
				}
			}
			this.properties.experience.current = this.abilities.reduce((sum, a) => {
				return sum - a.qty * a.experience
			}, this.properties.experience.score)
		},
		this.updateSkill = (skill) => {
			const skillKey = skill.name.toLowerCase()
			const parentKey = this.skills[skillKey].parent.toLowerCase()
			this.skills[skillKey].score = parseInt(skill.score)
			this.remainingSkills()
			while (this.skillsRemaining < 0 || this.skills[skillKey].score > this.traits[parentKey].score) {
				this.skills[skillKey].score--
				this.remainingSkills()
			}
		},
		this.updateTrait = (trait) => {
			const traitKey = trait.name.toLowerCase()
			this.traits[traitKey].score = parseInt(trait.score)
			this.remainingTraits()
			while (this.traitsRemaining < 0) {
				this.traits[traitKey].score--
				this.remainingTraits()
			}
			this.resetSkills()
			this.updateProperties()
			this.remainingSkills()
		},
		this.randomDescription = (category = 'All') => {
			switch (category) {
				case 'Age':
					this.description.age.value = randomAge()
					break
				case 'Hair':
					this.description.hair.value = randomHair(
						this.description.age.value,
						this.description.sex.value,
						this.description.skin.value
					)
					break
				case 'Height':
					this.description.height.value = randomHeight(this.description.sex.value)
					break
				case 'Name':
					this.description.name.value = randomName(this.description.sex.value)
					break
				case 'Sex':
					this.description.sex.value = randomSex()
					break
				case 'Skin':
					this.description.skin.value = randomSkin()
					break
				case 'Weight':
					this.description.weight.value = randomWeight(this.description.height.value, this.description.sex.value)
					break
				case 'All':
					this.description.age.value = randomAge()
					this.description.sex.value = randomSex()
					this.description.skin.value = randomSkin()
					this.description.name.value = randomName(this.description.sex.value)
					this.description.height.value = randomHeight(this.description.sex.value)
					this.description.weight.value = randomWeight(this.description.height.value, this.description.sex.value)
					this.description.hair.value = randomHair(
						this.description.age.value,
						this.description.sex.value,
						this.description.skin.value
					)
			}
		},
		this.randomTraits = () => {
			this.resetTraits()
			while (this.traitsRemaining) {
				const traitName = randomRoll(Object.keys(this.traits))
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
			while (this.skillsRemaining) {
				const skillName = randomRoll(Object.keys(this.skills))
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
				const remainingAbilities = Object.values(Abilities).filter((r) => {
					return !this.abilities.some((a) => a.name === r.name) && r.experience <= this.properties.experience.current
				})
				if (remainingAbilities.length) {
					const randomAbility = randomRoll(remainingAbilities)
					randomAbility.qty = 1
					if (randomAbility.options.length) {
						randomAbility.selection = randomNumber(randomAbility.options.length)
					}
					this.updateAbilities(randomAbility)
				} else break
			}
		},
		this.randomGear = () => {
			this.resetGear()
			this.gear.armor.inventory.push(randomArmor())
			this.gear.melee.inventory.push(randomMeleeWeapon())
			this.gear.projectile.inventory.push(randomProjectileWeapon())
			this.gear.ammo.inventory.push(
				randomAmmo({
					caliber: this.gear.projectile.inventory[0].cal,
					max: 6
				})
			)
			this.gear.equipment.inventory = [
				...randomEquipment({
					numberOfItems: this.properties.luck.current
				})
			]
			const food = Gear.resources.food
			food.qty = 1
			this.gear.equipment.inventory.push(food)
			const waterBottle = Gear.storage.waterbottle
			waterBottle.qty = 1
			this.gear.equipment.inventory.push(waterBottle)
			const water = Gear.resources.water
			water.qty = 1
			this.gear.equipment.inventory.push(water)
		},
		this.randomCharacter = () => {
			this.randomTraits()
			this.randomSkills()
			this.updateProperties()
			this.randomAbilities()
			this.randomGear()
			this.randomDescription()
		},
		this.finalize = (userId) => {
			 if(!this.meta.created) this.meta.created = new Date()
			this.meta.user = userId
			this.meta.modified = new Date()
		}
	}
}
