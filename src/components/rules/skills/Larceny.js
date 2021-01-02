import Rule from 'classes/Rule.js'

const Larceny = new Rule({
	name: `Larceny`,
	desc: [
		`Delicate manual operations.`,
	],
	type: `Skill`
})
Larceny.parent = `Agility`
Larceny.diff = `varies`
Larceny.specs = {
	mechanical: new Rule({
		id: `44d2e074-3316-41f1-a3f9-5252e8e2c0c4`,
		name: `Mechanical`,
		desc: [
			`(d6 rounds) Activate or deactivate Locks, Traps, Bombs, and similar mechanisms.`,
		]
	}),
	trick: new Rule({
		id: `959c5f50-d590-4064-bf23-65737cdafc61`,
		name: `Trick`,
		desc: [
			`Roll vs [Perception] to pick pockets, hide items, or some other sleight-of-hand.`,
		]
	})
}

export default Larceny