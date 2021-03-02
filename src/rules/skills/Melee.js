import Rule from 'classes/Rule.js'

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
			`Roll vs a Melee Attack to spend one Action attempting to actively deflect that Attack.`,
			`You may roll against Ranged Attacks as well in the same way if you are holding a Shield.`,
		]
	}),
	strike: new Rule({
		id: `1842e006-c064-4994-9f03-27e54f1d7b9f`,
		name: `Strike`,
		desc: [
			`Roll vs target's Defense.`,
		]
	})
}

export default Melee