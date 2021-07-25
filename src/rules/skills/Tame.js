import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Tame = new Skill({
	name: `Tame`,
	description: [`Alter an animal’s Attitude by one step.`],
	type: `Skill`,
	parent: `Demeanor`,
	difficulty: `Demeanor`,
	specialties: {
		command: new Specialty({
			name: `Command`,
			type: `Specialty`,
			description: [`Animal obeys your command.`],
		}),
		train: new Specialty({
			name: `Train`,
			type: `Specialty`,
			description: [`(1wk) Animals learn commands = [its Brains x 2].`],
		}),
	},
})

export default Tame
