import Skill from './Skill'
import Specialty from './Specialty'


const Science = new Skill({
	name: `Science`,
	desc: [
		`Knowledge of physical laws.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		chemistry: new Specialty({
			name: `Chemistry`,
			desc: [
				`(# x 10mins) Use [d6 + # Chemicals].`,
			]
		}),
		technology: new Specialty({
			name: `Technology`,
			desc: [
				`(varies) Make or use electronic devices.`,
			]
		})
	}
})

export default Science