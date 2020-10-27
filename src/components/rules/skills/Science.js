import Skill from 'skills/Skill.js'
import Stat from 'rules/Stat.js'

const Science = new Skill({
	id: `5da150b7-8643-4f9d-b9ad-470fa37510ae`,
	name: `Science`,
	desc: [
		`Knowledge of physical laws.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		chemistry: new Stat({
			id: `4f241948-5289-43e5-bc1f-77a04420b6bf`,
			name: `Chemistry`,
			desc: [
				`(# x 10mins) Use [d6 + # Chemicals].`,
			]
		}),
		technology: new Stat({
			id: `bb45ae73-369d-420d-b949-aac209c9abc7`,
			name: `Technology`,
			desc: [
				`(varies) Make or use electronic devices.`,
			]
		})
	}
})

export default Science