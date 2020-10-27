import Skill from 'skills/Skill.js'
import Stat from 'rules/Stat.js'

const Perform = new Skill({
	id: `4507c9b3-3b2e-4c05-be79-89785735180d`,
	name: `Perform`,
	desc: [
		`Captivating an audience.`,
	],
	parent: `Demeanor`,
	diff: `Perception`,
	specs: {
		distract: new Stat({
			id: `e0029c54-6812-4b0d-b143-f1f8dbc806b0`,
			name: `Distract`,
			desc: [
				`Target is Defenseless for 1 round.`,
			]
		}),
		deceive: new Stat({
			id: `f6ded447-ec92-4720-8f68-812e8d3a02f5`,
			name: `Deceive`,
			desc: [
				`Target believes your plausible falsehood.`,
			]
		})
	}
})

export default Perform