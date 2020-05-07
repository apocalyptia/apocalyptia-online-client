import Skill from './Skill'
import Specialty from './Specialty'


const Larceny = new Skill({
	name: `Larceny`,
	desc: [
		`Delicate manual operations.`,
	],
	parent: `agility`,
	diff: `varies`,
	specs: {
		mechanical: new Specialty({
			name: `Mechanical`,
			desc: [
				`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms`,
				`# by item.`,
			]
		}),
		trick: new Specialty({
			name: `Trick`,
			desc: [
				`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`,
			]
		})
	}
})

export default Larceny