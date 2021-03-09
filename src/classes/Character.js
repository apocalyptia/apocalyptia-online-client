import FinalizeCharacter from 'classes/methods/FinalizeCharacter.js'
import InitializeDescription from 'classes/methods/InitializeDescription.js'
import InitializeGear from 'classes/methods/InitializeGear.js'
import InitializeHealth from 'classes/methods/InitializeHealth.js'
import InitializeMeta from 'classes/methods/InitializeMeta.js'
import InitializeProperties from 'classes/methods/InitializeProperties.js'
import InitializeSkills from 'classes/methods/InitializeSkills.js'
import InitializeTraits from 'classes/methods/InitializeTraits.js'
import ResetAbilities from 'classes/methods/ResetAbilities.js'
import ResetDescription from 'classes/methods/ResetDescription.js'
import ResetGear from 'classes/methods/ResetGear.js'
import ResetHealth from 'classes/methods/ResetHealth.js'
import ResetProperties from 'classes/methods/ResetProperties.js'
import ResetSkills from 'classes/methods/ResetSkills.js'
import ResetTraits from 'classes/methods/ResetTraits.js'
import UpdateAbilities from 'classes/methods/UpdateAbilities.js'
import UpdateProperties from 'classes/methods/UpdateProperties.js'

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
		this.applyAbilities = _ => {
			for (let a in this.abilities) {
				this.abilities[a].formula(this)
			}
		}
		this.finalize = (userId) => FinalizeCharacter(this, userId)
	}
}