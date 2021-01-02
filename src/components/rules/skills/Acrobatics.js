import Rule from 'classes/Rule.js'

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
			`Roll Acrobatics(Dodge) vs [Melee or Ranged] for active Defense.`,
			`Reflexive Dodge is your Dodge score with no roll.`,
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