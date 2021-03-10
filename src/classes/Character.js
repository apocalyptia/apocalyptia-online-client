import FinalizeCharacter from 'classes/methods/character/FinalizeCharacter.js'
import InitializeDescription from 'classes/methods/character/initialize/InitializeDescription.js'
import InitializeGear from 'classes/methods/character/initialize/InitializeGear.js'
import InitializeHealth from 'classes/methods/character/initialize/InitializeHealth.js'
import InitializeMeta from 'classes/methods/character/initialize/InitializeMeta.js'
import InitializeProperties from 'classes/methods/character/initialize/InitializeProperties.js'
import InitializeSkills from 'classes/methods/character/initialize/InitializeSkills.js'
import InitializeTraits from 'classes/methods/character/initialize/InitializeTraits.js'
import ResetAbilities from 'classes/methods/character/reset/ResetAbilities.js'
import ResetDescription from 'classes/methods/character/reset/ResetDescription.js'
import ResetGear from 'classes/methods/character/reset/ResetGear.js'
import ResetHealth from 'classes/methods/character/reset/ResetHealth.js'
import ResetProperties from 'classes/methods/character/reset/ResetProperties.js'
import ResetSkills from 'classes/methods/character/reset/ResetSkills.js'
import ResetTraits from 'classes/methods/character/reset/ResetTraits.js'
import SaveCharacter from 'database/characters/SaveCharacter.js'
import UpdateAbilities from 'classes/methods/character/update/UpdateAbilities.js'
import UpdateProperties from 'classes/methods/character/update/UpdateProperties.js'

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
		this.save = _ => SaveCharacter(this)
	}
}