import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Perception = new Skill({
	name: `Perception`,
	description: [`Processing sensory input.`],
	type: `Skill`,
	parent: `Brains`,
	difficulty: `varies`,
	specialties: {
		search: new Specialty({
			name: `Search`,
			type: `Specialty`,
			description: [`Roll vs [Stealth (or Survival if tracking)].`]
		}),
		intuition: new Specialty({
			name: `Intuition`,
			type: `Specialty`,
			description: [`Roll vs [Socialize or Perform].`]
		})
	}
})

export default Perception
