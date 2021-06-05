import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Larceny = new Skill({
	name: `Larceny`,
	description: [`Delicate manual operations.`],
	type: `Skill`,
	parent: `Agility`,
	difficulty: `varies`,
	specialties: {
		mechanical: new Specialty({
			name: `Mechanical`,
			type: `Specialty`,
			description: [`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms.`]
		}),
		trick: new Specialty({
			name: `Trick`,
			type: `Specialty`,
			description: [`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`]
		})
	}
})

export default Larceny
