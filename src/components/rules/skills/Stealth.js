import Skill from './Skill'
import Specialty from './Specialty'


const Stealth = new Skill({
	name: `Stealth`,
	desc: [
		`Conceal your presence.`,
	],
	parent: `Agility`,
	diff: `Perception`,
	specs: {
		hide: new Specialty({
			name: `Hide`,
			desc: [`Stay motionless and Concealed`,
				`+3 if Prone.`,]
		}),
		sneak: new Specialty({
			name: `Sneak`,
			desc: [
				`Move Walk Speed while Concealed.`,
			]
		})
	}
})

export default Stealth