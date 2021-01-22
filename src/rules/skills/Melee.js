import Rule from '$classes/Rule.js'

const Melee = new Rule({
	name: `Melee`,
	desc: [
		`Hand-to-hand combat.`,
	],
	type: `Skill`
})
Melee.parent = `Constitution`
Melee.diff = `Attack or Defense`
Melee.specs = {
	block: new Rule({
		id: `ad9c0c5a-f399-4f81-ba33-6242b17fc5e6`,
		name: `Block`,
		desc: [
			`Roll vs [Melee or Ranged (if you have a Shield)] for active Defense.`,
			`Reflexive Block is your Block score with no roll.`,
		]
	}),
	strike: new Rule({
		id: `1842e006-c064-4994-9f03-27e54f1d7b9f`,
		name: `Strike`,
		desc: [
			`Roll vs target's Defense.`,
			`Damage = [weapon Damage + Success].`,
		]
	})
}

export default Melee