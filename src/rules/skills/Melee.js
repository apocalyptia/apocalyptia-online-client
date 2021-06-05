import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Melee = new Skill({
	name: `Melee`,
	description: [`Hand-to-hand combat.`],
	type: `Skill`,
	parent: `Constitution`,
	difficulty: `Attack or Defense`,
	specialties: {
		block: new Specialty({
			name: `Block`,
			type: `Specialty`,
			description: [
				`Roll vs a Melee Attack to attempt to actively deflect that Attack as an Action.`,
				`You may roll vs Projectile Attacks as well if you are holding a Shield.`
			]
		}),
		strike: new Specialty({
			name: `Strike`,
			type: `Specialty`,
			description: [`Roll vs target's Defense to attempt a basic Melee Attack.`]
		})
	}
})

export default Melee
