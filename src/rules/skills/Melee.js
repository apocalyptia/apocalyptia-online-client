import Skill from '../../classes/Skill.js' 
import Specialty from '../../classes/Specialty.js' 

const Melee = new Skill({
	name: `Melee`,
	desc: [
		`Hand-to-hand combat.`,
	],
	type: `Skill`,
	parent: `Constitution`,
	diff: `Attack or Defense`,
	specs: {
		block: new Specialty({
			name: `Block`,
			type: `Specialty`,
			desc: [
				`Roll vs a Melee Attack to spend one Action attempting to actively deflect that Attack.`,
				`You may roll against Projectile Attacks as well in the same way if you are holding a Shield.`,
			]
		}),
		strike: new Specialty({
			name: `Strike`,
			type: `Specialty`,
			desc: [
				`Roll vs target's Defense.`,
			]
		})
	}
})

export default Melee