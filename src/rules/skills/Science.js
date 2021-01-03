import Rule from 'classes/Rule.js'

const Science = new Rule({
	name: `Science`,
	desc: [
		`Knowledge of physical laws.`,
	],
	type: `Skill`
})
Science.parent = `Brains`
Science.diff = `varies`
Science.specs = {
	chemistry: new Rule({
		id: `4f241948-5289-43e5-bc1f-77a04420b6bf`,
		name: `Chemistry`,
		desc: [
			`(# x 10mins) Use [d6 + # Chemicals].`,
		]
	}),
	technology: new Rule({
		id: `bb45ae73-369d-420d-b949-aac209c9abc7`,
		name: `Technology`,
		desc: [
			`(varies) Make or use electronic devices.`,
		]
	})
}

export default Science