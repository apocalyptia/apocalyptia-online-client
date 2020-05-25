import Skill from './Skill'
import Specialty from './Specialty'


const Larceny = new Skill({
	id: `f8725bd3-a40a-43b6-9b1b-4a9bcd1c957e`,
	name: `Larceny`,
	desc: [
		`Delicate manual operations.`,
	],
	parent: `agility`,
	diff: `varies`,
	specs: {
		mechanical: new Specialty({
			id: `44d2e074-3316-41f1-a3f9-5252e8e2c0c4`,
			name: `Mechanical`,
			desc: [
				`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms`,
				`# by item.`,
			]
		}),
		trick: new Specialty({
			id: `959c5f50-d590-4064-bf23-65737cdafc61`,
			name: `Trick`,
			desc: [
				`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`,
			]
		})
	}
})

export default Larceny