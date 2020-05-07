import Skill from './Skill'
import Specialty from './Specialty'


const Perform = new Skill({
	name: `Perform`,
	desc: [
		`Captivating an audience.`,
	],
	parent: `Demeanor`,
	diff: `Perception`,
	specs: {
		distract: new Specialty({
			name: `Distract`,
			desc: [
				`Target is Defenseless for 1 round.`,
			]
		}),
		deceive: new Specialty({
			name: `Deceive`,
			desc: [
				`Target believes your plausible falsehood.`,
			]
		})
	}
})

export default Perform