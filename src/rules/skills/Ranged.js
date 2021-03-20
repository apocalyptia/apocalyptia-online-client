import Rule from '/src/classes/Rule.js'

const Ranged = new Rule({
	name: `Ranged`,
	desc: [
		`Projectile combat.`,
	],
	type: `Skill`
})
Ranged.parent = `Agility`
Ranged.diff = `Defense`
Ranged.specs = {
	shoot: new Rule({
		id: `f6a049f5-bc9e-48d2-b0d3-2df479cc7c6e`,
		name: `Shoot`,
		desc: [
			`Roll vs target's Defense.`,
		]
	}),
	throw: new Rule({
		id: `c3e75b6f-c686-4c4f-91a8-ee10dfe66b07`,
		name: `Throw`,
		desc: [
			`Roll vs target's Defense.`,
			`Range is [Constitution x 3yds].`,
		]
	})
}

export default Ranged