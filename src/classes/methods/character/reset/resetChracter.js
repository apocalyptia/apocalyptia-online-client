import CreationProcess from '/src/rules/CreationProcess.js'
import initializeDescription from '/src/classes/methods/character/initialize/initializeDescription.js'
import initializeGear from '/src/classes/methods/character/initialize/initializeGear.js'
import initializeMeta from '/src/classes/methods/character/initialize/initializeMeta.js'
import initializeProperties from '/src/classes/methods/character/initialize/initializeProperties.js'
import initializeSkills from '/src/classes/methods/character/initialize/initializeSkills.js'
import initializeTraits from '/src/classes/methods/character/initialize/initializeTraits.js'

export default function() {
	this.meta = initializeMeta()
	this.description = initializeDescription()
	this.traits = initializeTraits()
	this.skills = initializeSkills()
	this.properties = initializeProperties()
	this.abilities = []
	this.gear = initializeGear()
	this.meta.maxTraits = parseInt(CreationProcess.traits.max)
	this.proceed = false
	this.meta.skillsRemaining = parseInt(CreationProcess.skills.startingMultiplier)
	this.meta.startingSkillsMultiplier = parseInt(CreationProcess.skills.startingMultiplier)
	this.meta.startingTraits = parseInt(CreationProcess.traits.starting)
	this.meta.traitsRemaining = parseInt(CreationProcess.traits.starting)
	return this
}