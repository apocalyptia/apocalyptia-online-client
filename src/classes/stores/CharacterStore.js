import CreationProcess from '/src/rules/CreationProcess.js'
import addAbility from '/src/classes/methods/character/add/addAbility.js'
import finalizeCharacter from '/src/classes/methods/character/finalizeCharacter.js'
import initializeDescription from '/src/classes/methods/character/initialize/initializeDescription.js'
import initializeGear from '/src/classes/methods/character/initialize/initializeGear.js'
import initializeMeta from '/src/classes/methods/character/initialize/initializeMeta.js'
import initializeProperties from '/src/classes/methods/character/initialize/initializeProperties.js'
import initializeSkills from '/src/classes/methods/character/initialize/initializeSkills.js'
import initializeTraits from '/src/classes/methods/character/initialize/initializeTraits.js'
import randomAbilities from '/src/classes/methods/character/random/randomAbilities.js'
import randomCharacter from '/src/classes/methods/character/random/randomCharacter.js'
import randomDescription from '/src/classes/methods/character/random/randomDescription.js'
import randomGear from '/src/classes/methods/character/random/randomGear.js'
import randomSkills from '/src/classes/methods/character/random/randomSkills.js'
import randomTraits from '/src/classes/methods/character/random/randomTraits.js'
import remainingAbilities from '/src/classes/methods/character/remaining/remainingAbilities.js'
import remainingSkills from '/src/classes/methods/character/remaining/remainingSkills.js'
import remainingTraits from '/src/classes/methods/character/remaining/remainingTraits.js'
import resetAbilities from '/src/classes/methods/character/reset/resetAbilities.js'
import resetChracter from '/src/classes/methods/character/reset/resetChracter.js'
import resetDescription from '/src/classes/methods/character/reset/resetDescription.js'
import resetGear from '/src/classes/methods/character/reset/resetGear.js'
import resetProperties from '/src/classes/methods/character/reset/resetProperties.js'
import resetSkills from '/src/classes/methods/character/reset/resetSkills.js'
import resetTraits from '/src/classes/methods/character/reset/resetTraits.js'
import updateProperties from '/src/classes/methods/character/update/updateProperties.js'
import updateSkill from '/src/classes/methods/character/update/updateSkill.js'
import updateTrait from '/src/classes/methods/character/update/updateTrait.js'

export default class Character {
	constructor() {
		this.meta = initializeMeta(),
		this.description = initializeDescription(),
		this.traits = initializeTraits(),
		this.skills = initializeSkills(),
		this.properties = initializeProperties(),
		this.abilities = [],
		this.gear = initializeGear(),
		this.maxTraits = parseInt(CreationProcess.traits.max),
		this.skillsRemaining = parseInt(CreationProcess.skills.startingMultiplier),
		this.startingSkillsMultiplier = parseInt(CreationProcess.skills.startingMultiplier),
		this.startingTraits = parseInt(CreationProcess.traits.starting),
		this.traitsRemaining = parseInt(CreationProcess.traits.starting)
		this.remainingTraits = remainingTraits
		this.remainingSkills = remainingSkills
		this.remainingAbilities = remainingAbilities
		this.resetGear = resetGear
		this.resetAbilities = resetAbilities
		this.resetDescription = resetDescription
		this.resetProperties = resetProperties
		this.resetSkills = resetSkills
		this.resetTraits = resetTraits
		this.resetCharacter = resetChracter
		this.addAbility = addAbility
		this.updateProperties = updateProperties
		this.updateSkill = updateSkill
		this.updateTrait = updateTrait
		this.randomDescription = randomDescription
		this.randomTraits = randomTraits
		this.randomSkills = randomSkills
		this.randomAbilities = randomAbilities
		this.randomGear = randomGear
		this.randomCharacter = randomCharacter
		this.finalizeCharacter = finalizeCharacter
	}
}
