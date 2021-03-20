import Rule from '/src/classes/Rule.js'

const Athletics = new Rule({
	name: `Athletics`,
	desc: [
		`Physically difficult forms of motion.`,
	],
	type: `Skill`
})
Athletics.parent = `Constitution`
Athletics.diff = `varies`
Athletics.specs = {
	climb: new Rule({
		id: `fda9b21e-5ee1-448f-a7f5-3d358e9ad062`,
		name: `Climb`,
		desc: [
			`Move along vertical surfaces at [Walk Speed / 2].`,
		]
	}),
	swim: new Rule({
		id: `f35bb291-4130-4cba-9841-dcc156eba70c`,
		name: `Swim`,
		desc: [
			`Move in water at [Speed / 4].`,
		]
	})
}

export default Athletics