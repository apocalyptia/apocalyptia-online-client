import Skill from 'skills/Skill.js'
import Stat from 'rules/Stat.js'

const Perception = new Skill({
	id: `1dd3402d-a974-49d1-ae43-bcc63c4925bc`,
	name: `Perception`,
	desc: [
		`Processing sensory input.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		search: new Stat({
			id: `68ea4f9c-12dd-4bcd-b2a3-a6d70b48a16e`,
			name: `Search`,
			desc: [
				`Roll vs [Stealth (or Survival if tracking)].`,
			]
		}),
		intuition: new Stat({
			id: `61372444-6825-4ad5-967e-a2b4ce991960`,
			name: `Intuition`,
			desc: [
				`Roll vs [Socialize or Perform].`,
			]
		})
	}
})

export default Perception