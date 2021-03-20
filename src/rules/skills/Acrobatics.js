import Rule from '/src/classes/Rule.js'

const Acrobatics = new Rule({
	name: `Acrobatics`,
	desc: [
		`Gymnastic prowess.`,
	],
	type: `Skill`
})
Acrobatics.parent = `Agility`
Acrobatics.diff = 6
Acrobatics.specs = {
	dodge: new Rule({
		id: `a7451f3a-9970-431a-8304-f36ae046e85b`,
		name: `Dodge`,
		desc: [
			`Roll vs a Melee or Ranged Attack to spend one Action attempting to actively evade that Attack.`,
		]
	}),
	jump: new Rule({
		id: `7a5e0273-8d72-43c3-a826-0a927e2ee0e9`,
		name: `Jump`,
		desc: [
			`Running Jump distance is [Agility] yards.`,
			`Standing vertical Jump height is [Agility / 2] feet.`,
		]
	})
}

export default Acrobatics