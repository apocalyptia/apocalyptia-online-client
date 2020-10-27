import Skill from 'skills/Skill.js'
import Stat from 'rules/Stat.js'

const Ranged = new Skill({
	id: `da193540-c5fc-408d-bf3a-a69aa046fa84`,
	name: `Ranged`,
	desc: [
		`Projectile combat.`,
	],
	parent: `Agility`,
	diff: `Defense`,
	specs: {
		shoot: new Stat({
			id: `f6a049f5-bc9e-48d2-b0d3-2df479cc7c6e`,
			name: `Shoot`,
			desc: [
				`Roll vs [Dodge or Block (with a Shield)].`,
			]
		}),
		throw: new Stat({
			id: `c3e75b6f-c686-4c4f-91a8-ee10dfe66b07`,
			name: `Throw`,
			desc: [
				`Roll vs [Dodge or Block]`,
				`Range is [Constitution x 3yds]`,
			]
		})
	}
})

export default Ranged