import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Athletics = new Skill({
	name: `Athletics`,
	description: [`Physically difficult forms of motion.`],
	type: `Skill`,
	parent: `Constitution`,
	difficulty: `varies`,
	specialties: {
		climb: new Specialty({
			name: `Climb`,
			type: `Specialty`,
			description: [`Move along vertical surfaces at [Walk Speed / 2].`]
		}),
		swim: new Specialty({
			name: `Swim`,
			type: `Specialty`,
			description: [`Move in water at [Speed / 4].`]
		})
	}
})

export default Athletics
