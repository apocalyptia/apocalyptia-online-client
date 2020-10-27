import Skill from 'skills/Skill.js'
import Stat from 'rules/Stat.js'

const Melee = new Skill({
	id: `1f84042e-c02b-477f-8662-41d3a0ccc4d5`,
	name: `Melee`,
	desc: [
		`Hand-to-hand combat.`,
	],
	parent: `Constitution`,
	diff: `Attack or Defense`,
	specs: {
		block: new Stat({
			id: `ad9c0c5a-f399-4f81-ba33-6242b17fc5e6`,
			name: `Block`,
			desc: [
				`Roll vs [Melee or Ranged (if you have a Shield)].`,
				`Reflexive Block is your Block score with no roll.`,
			]
		}),
		strike: new Stat({
			id: `1842e006-c064-4994-9f03-27e54f1d7b9f`,
			name: `Strike`,
			desc: [
				`Roll vs [Defense].`,
				`Damage = [weapon Damage + Success].`,
			]
		})
	}
})

export default Melee