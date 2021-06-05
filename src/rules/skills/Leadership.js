import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Leadership = new Skill({
	name: `Leadership`,
	description: [
		`Directing the efforts of others`,
		`Modifiers from multiple uses of the same Leadership Specialty do not stack.`
	],
	type: `Skill`,
	parent: `Demeanor`,
	difficulty: `Demeanor`,
	specialties: {
		encourage: new Specialty({
			name: `Encourage`,
			type: `Specialty`,
			description: [`Roll vs [total target(s) Demeanor].`, `Target(s) get a bonus = [your Demeanor] to one roll you choose.`]
		}),
		intimidate: new Specialty({
			name: `Intimidate`,
			type: `Specialty`,
			description: [
				`Roll vs [total target(s) Demeanor].`,
				`Target(s) take a penalty = [your Demeanor] to any roll except one you choose.`
			]
		})
	}
})

export default Leadership
