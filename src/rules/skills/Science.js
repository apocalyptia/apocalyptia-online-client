import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Science = new Skill({
	name: `Science`,
	description: [`Knowledge of physical laws.`],
	type: `Skill`,
	parent: `Brains`,
	difficulty: `varies`,
	specialties: {
		chemistry: new Specialty({
			name: `Chemistry`,
			type: `Specialty`,
			description: [
				`Mix Chemicals to make Bombs, Drugs, Medicine, etc.`,
				`Time required is [ Mix # x 10] minutes.`,
				`Requires the use of [ d6 + Mix #] Chemicals.`
			]
		}),
		technology: new Specialty({
			name: `Technology`,
			type: `Specialty`,
			description: [`(varies) Make or use electronic devices.`]
		})
	}
})

export default Science
