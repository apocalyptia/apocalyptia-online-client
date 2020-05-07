import Skill from './Skill'
import Specialty from './Specialty'


const Perception = new Skill({
	name: `Perception`,
	desc: [
		`Processing sensory input.`,
	],
	parent: `Brains`,
	diff: `varies`,
	specs: {
		search: new Specialty({
			name: `Search`,
			desc: [
				`Roll vs [Stealth (or Survival if tracking)].`,
			]
		}),
		intuition: new Specialty({
			name: `Intuition`,
			desc: [
				`Roll vs [Socialize or Perform].`,
			]
		})
	}
})

export default Perception