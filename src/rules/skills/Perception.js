import Rule from '/src/classes/Rule.js'

const Perception = new Rule({
	name: `Perception`,
	desc: [
		`Processing sensory input.`,
	],
	type: `Skill`
})
Perception.parent = `Brains`
Perception.diff = `varies`
Perception.specs = {
	search: new Rule({
		id: `68ea4f9c-12dd-4bcd-b2a3-a6d70b48a16e`,
		name: `Search`,
		desc: [
			`Roll vs [Stealth (or Survival if tracking)].`,
		]
	}),
	intuition: new Rule({
		id: `61372444-6825-4ad5-967e-a2b4ce991960`,
		name: `Intuition`,
		desc: [
			`Roll vs [Socialize or Perform].`,
		]
	})
}

export default Perception