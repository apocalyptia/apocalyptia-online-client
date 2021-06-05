import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Perform = new Skill({
	name: `Perform`,
	description: [`Captivating an audience.`],
	type: `Skill`,
	parent: `Demeanor`,
	difficulty: `Perception`,
	specialties: {
		distract: new Specialty({
			name: `Distract`,
			type: `Specialty`,
			description: [`Target is Defenseless for 1 Round.`]
		}),
		deceive: new Specialty({
			name: `Deceive`,
			type: `Specialty`,
			description: [`Target believes your plausible falsehood.`]
		})
	}
})

export default Perform
