import { v4 as uuidv4 } from 'uuid'
import CreationProcess from '$rules/CreationProcess.js'

export default () => {
	return {
		id: uuidv4(),
		user: ``,
		created: ``,
		modified: ``,
		notes: ``,
		numberOfSteps: 6,
		proceed: false,
		process: [],
		status: [],
		step: 1,
		coordinates: {
			m: ``,
			f: 0,
			x: 0,
			y: 0,
			z: 0,
		},
		maxTraits: parseInt(CreationProcess.traits.max),
		skillsRemaining: parseInt(CreationProcess.skills.startingMultiplier),
		startingSkillsMultiplier: parseInt(CreationProcess.skills.startingMultiplier),
		startingTraits: parseInt(CreationProcess.traits.starting),
		traitsRemaining: parseInt(CreationProcess.traits.starting)
	}
}
