import Skill from '../../classes/Skill'
import Specialty from '../../classes/Specialty'


const leadership = new Skill({
	name: `Leadership`,
	desc: [
		`Directing the efforts of others`,
		`Modifiers from multiple uses of the same Leadership Specialty do not stack.`,
	],
	parent: `Demeanor`,
	diff: `Demeanor`,
	specs: {
		encourage: new Specialty({
			name: `Encourage`,
			desc: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) get a bonus = [your Demeanor] to one roll you choose.`,
			]
		}),
		intimidate: new Specialty({
			name: `Intimidate`,
			desc: [
				`Roll vs [total target(s) Demeanor]`,
				`Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`
			]
		})
	}
})

export default leadership