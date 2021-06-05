import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Stealth = new Skill({
	name: `Stealth`,
	description: [`Conceal your presence.`],
	type: `Skill`,
	parent: `Agility`,
	difficulty: `Perception`,
	specialties: {
		hide: new Specialty({
			name: `Hide`,
			type: `Specialty`,
			description: [`Stay motionless and Concealed`, `+3 if Prone.`]
		}),
		sneak: new Specialty({
			name: `Sneak`,
			type: `Specialty`,
			description: [`Move Walk Speed while Concealed.`]
		})
	}
})

export default Stealth
