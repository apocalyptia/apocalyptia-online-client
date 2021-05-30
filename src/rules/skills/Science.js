import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Science = new Skill({
	name: `Science`,
	desc: [`Knowledge of physical laws.`],
	type: `Skill`,
	parent: `Brains`,
	diff: `varies`,
	specs: {
		chemistry: new Specialty({
			name: `Chemistry`,
			type: `Specialty`,
			desc: [
				`Mix Chemicals to make Bombs, Drugs, Medicine, etc.`,
				`Time required is [Mix # x 10] minutes.`,
				`Requires the use of [d6 + Mix #] Chemicals.`
			]
		}),
		technology: new Specialty({
			name: `Technology`,
			type: `Specialty`,
			desc: [`(varies) Make or use electronic devices.`]
		})
	}
})

export default Science
