import AbilitiesStep from '/src/components/character/creator/steps/AbilitiesStep.svelte'
import DescriptionStep from '/src/components/character/creator/steps/DescriptionStep.svelte'
import GearStep from '/src/components/character/creator/steps/GearStep.svelte'
import PropertiesStep from '/src/components/character/creator/steps/PropertiesStep.svelte'
import SkillsStep from '/src/components/character/creator/steps/SkillsStep.svelte'
import TraitsStep from '/src/components/character/creator/steps/TraitsStep.svelte'
import canProceed from '/src/classes/methods/creation/canProceed.js'
import checkMax from '/src/classes/methods/creation/checkMax.js'
import checkMin from '/src/classes/methods/creation/checkMin.js'

export default class {
	constructor() {
		this.numberOfSteps = 6
		this.proceed = false
		this.process = [
			TraitsStep,
			SkillsStep,
			PropertiesStep,
			AbilitiesStep,
			GearStep,
			DescriptionStep,
		]
		this.step = 0
		this.checkMax = checkMax
		this.checkMin = checkMin
		this.canProceed = canProceed
	}
}