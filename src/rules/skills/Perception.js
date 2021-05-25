import Skill from '../../classes/Skill.js' 
import Specialty from '../../classes/Specialty.js' 

const Perception = new Skill({
	name: `Perception`,
	desc: [
		`Processing sensory input.`,
	],
	type: `Skill`,
	parent: `Brains`,
	diff: `varies`,
	specs: {
		search: new Specialty({
			name: `Search`,
			type: `Specialty`,
			desc: [
				`Roll vs [Stealth (or Survival if tracking)].`,
			]
		}),
		intuition: new Specialty({
			name: `Intuition`,
			type: `Specialty`,
			desc: [
				`Roll vs [Socialize or Perform].`,
			]
		})
	}
})

export default Perception