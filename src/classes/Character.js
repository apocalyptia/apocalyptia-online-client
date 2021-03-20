import FinalizeCharacter from '/src/classes/methods/character/FinalizeCharacter.js'
import InitializeDescription from '/src/classes/methods/character/initialize/InitializeDescription.js'
import InitializeGear from '/src/classes/methods/character/initialize/InitializeGear.js'
import InitializeHealth from '/src/classes/methods/character/initialize/InitializeHealth.js'
import InitializeMeta from '/src/classes/methods/character/initialize/InitializeMeta.js'
import InitializeProperties from '/src/classes/methods/character/initialize/InitializeProperties.js'
import InitializeSkills from '/src/classes/methods/character/initialize/InitializeSkills.js'
import InitializeTraits from '/src/classes/methods/character/initialize/InitializeTraits.js'
import ResetAbilities from '/src/classes/methods/character/reset/ResetAbilities.js'
import ResetDescription from '/src/classes/methods/character/reset/ResetDescription.js'
import ResetGear from '/src/classes/methods/character/reset/ResetGear.js'
import ResetHealth from '/src/classes/methods/character/reset/ResetHealth.js'
import ResetProperties from '/src/classes/methods/character/reset/ResetProperties.js'
import ResetSkills from '/src/classes/methods/character/reset/ResetSkills.js'
import ResetTraits from '/src/classes/methods/character/reset/ResetTraits.js'
import UpdateAbilities from '/src/classes/methods/character/update/UpdateAbilities.js'
import UpdateProperties from '/src/classes/methods/character/update/UpdateProperties.js'

export default class Character {
	constructor() {
		this.meta = InitializeMeta(this)
		this.description = InitializeDescription(this)
		this.traits = InitializeTraits(this)
		this.skills = InitializeSkills(this)
		this.properties = InitializeProperties(this)	
		this.health = InitializeHealth(this)
		this.abilities = []
		this.gear = InitializeGear(this)
		this.resetAbilities = _ => ResetAbilities(this)
		this.resetDescription = _ => ResetDescription(this)
		this.resetGear = _ => ResetGear(this)
		this.resetHealth = _ => ResetHealth(this)
		this.resetProperties = _ => ResetProperties(this)
		this.resetSkills = _ => ResetSkills(this)
		this.resetTraits = _ => ResetTraits(this)
		this.updateAbilities = _ => UpdateAbilities(this)
		this.updateProperties = _ => UpdateProperties(this)
		this.finalize = (userId) => FinalizeCharacter(this, userId)
	}
}