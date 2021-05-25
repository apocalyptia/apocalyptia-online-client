import Skill from '../../classes/Skill.js' 
import Specialty from '../../classes/Specialty.js' 

const Stealth = new Skill({
	name: `Stealth`,
	desc: [
		`Conceal your presence.`,
	],
	type: `Skill`,
	parent: `Agility`,
	diff: `Perception`,
	specs: {
		hide: new Specialty({
			name: `Hide`,
			type: `Specialty`,
			desc: [
				`Stay motionless and Concealed`,
				`+3 if Prone.`,
			]
		}),
		sneak: new Specialty({
			name: `Sneak`,
			type: `Specialty`,
			desc: [
				`Move Walk Speed while Concealed.`,
			]
		})
	}
})

export default Stealth