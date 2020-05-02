import Skill from '../../classes/Skill'
import Specialty from '../../classes/Specialty'


const ranged = new Skill({
	name: `Ranged`,
	desc: [
		`Projectile combat.`,
	],
	parent: `Agility`,
	diff: `Defense`,
	specs: {
		shoot: new Specialty({
			name: `Shoot`,
			desc: [
				`Roll vs [Dodge or Block (with a Shield)].`,
			]
		}),
		throw: new Specialty({
			name: `Throw`,
			desc: [
				`Roll vs [Dodge or Block]`,
				`Range is [Constitution x 3yds]`,
			]
		})
	}
})

export default ranged