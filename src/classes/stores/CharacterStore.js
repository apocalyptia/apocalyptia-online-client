import addAbility from '$classes/methods/character/add/addAbility.js'
import finalizeCharacter from '$classes/methods/character/finalizeCharacter.js'
import initializeDescription from '$classes/methods/character/initialize/initializeDescription.js'
import initializeGear from '$classes/methods/character/initialize/initializeGear.js'
import initializeMeta from '$classes/methods/character/initialize/initializeMeta.js'
import initializeProperties from '$classes/methods/character/initialize/initializeProperties.js'
import initializeSkills from '$classes/methods/character/initialize/initializeSkills.js'
import initializeTraits from '$classes/methods/character/initialize/initializeTraits.js'
import randomAbilities from '$classes/methods/character/random/randomAbilities.js'
import randomCharacter from '$classes/methods/character/random/randomCharacter.js'
import randomDescription from '$classes/methods/character/random/randomDescription.js'
import randomGear from '$classes/methods/character/random/randomGear.js'
import randomSkills from '$classes/methods/character/random/randomSkills.js'
import randomTraits from '$classes/methods/character/random/randomTraits.js'
import remainingAbilities from '$classes/methods/character/remaining/remainingAbilities.js'
import remainingSkills from '$classes/methods/character/remaining/remainingSkills.js'
import remainingTraits from '$classes/methods/character/remaining/remainingTraits.js'
import resetAbilities from '$classes/methods/character/reset/resetAbilities.js'
import resetCharacter from '$classes/methods/character/reset/resetCharacter.js'
import resetDescription from '$classes/methods/character/reset/resetDescription.js'
import resetGear from '$classes/methods/character/reset/resetGear.js'
import resetProperties from '$classes/methods/character/reset/resetProperties.js'
import resetSkills from '$classes/methods/character/reset/resetSkills.js'
import resetTraits from '$classes/methods/character/reset/resetTraits.js'
import updateProperties from '$classes/methods/character/update/updateProperties.js'
import updateSkill from '$classes/methods/character/update/updateSkill.js'
import updateTrait from '$classes/methods/character/update/updateTrait.js'
import creationCanProceed from '$classes/methods/character/creation/creationCanProceed.js'
import creationCheckMaxSteps from '$classes/methods/character/creation/creationCheckMaxSteps.js'
import creationCheckMinSteps from '$classes/methods/character/creation/creationCheckMinSteps.js'

export default class Character {
	constructor() {
		// properties
		this.meta = initializeMeta()
		this.description = initializeDescription(),
		this.traits = initializeTraits(),
		this.skills = initializeSkills(),
		this.properties = initializeProperties(),
		this.abilities = [],
		this.gear = initializeGear(),

		// methods
		this.creationCanProceed = creationCanProceed
		this.creationCheckMaxSteps = creationCheckMaxSteps
		this.creationCheckMinSteps = creationCheckMinSteps

		this.remainingTraits = remainingTraits
		this.remainingSkills = remainingSkills
		this.remainingAbilities = remainingAbilities

		this.resetGear = resetGear
		this.resetAbilities = resetAbilities
		this.resetDescription = resetDescription
		this.resetProperties = resetProperties
		this.resetSkills = resetSkills
		this.resetTraits = resetTraits
		this.resetCharacter = resetCharacter

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
