import Rule from '$classes/Rule.js'

const Survival = new Rule({
	name: `Survival`,
	desc: [
		`Primitive practices for living outdoors.`,
	],
	type: `Skill`
})
Survival.parent = `Brains`
Survival.diff = `Biome`
Survival.specs = {
	forage: new Rule({
		id: `cdb225a5-e82f-4be6-855c-bc78ef6f44fc`,
		name: `Forage`,
		desc: [
			`(1hr) Provide 1 Need for 1 person.`,
		]
	}),
	navigate: new Rule({
		id: `9c1f6a61-bc28-4dde-b89f-0c9a34555f50`,
		name: `Navigate`,
		desc: [
			`(1min) Plot course`,
			`Roll vs [Perception] if tracked.`,
		]
	})
}

export default Survival