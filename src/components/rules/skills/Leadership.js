import Skill from 'skills/Skill.js'
import Stat from 'rules/Stat.js'

const Leadership = new Skill({
	id: `7596f84f-d625-409d-a7b0-4e0775d96719`,
	name: `Leadership`,
	desc: [
		`Directing the efforts of others`,
		`Modifiers from multiple uses of the same Leadership Specialty do not stack.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		encourage: new Stat({
			id: `95b70f3c-d67e-41ae-99ff-2d5864356a59`,
			name: `Encourage`,
			desc: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) get a bonus = [your Demeanor] to one roll you choose.`,
			]
		}),
		intimidate: new Stat({
			id: `ff3e883c-2952-459e-8dbf-d3f666383ec9`,
			name: `Intimidate`,
			desc: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`
			]
		})
	}
})

export default Leadership