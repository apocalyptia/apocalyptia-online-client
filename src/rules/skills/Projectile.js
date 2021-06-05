import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Projectile = new Skill({
	name: `Projectile`,
	description: [`Projectile combat.`],
	type: `Skill`,
	parent: `Agility`,
	difficulty: `Defense`,
	specialties: {
		firearm: new Specialty({
			name: `Firearm`,
			type: `Specialty`,
			description: [`Roll vs target's Defense to attempt a basic Projectile Attack with a gun.`]
		}),
		traditional: new Specialty({
			name: `Traditional`,
			type: `Specialty`,
			description: [
				`Roll vs target's Defense to attempt a basic Projectile Attack with any type of bow, thrown weapon, or any other muscle-powered Projectile.`,
				`Any Melee weapon can be a thrown weapon with a base Range of [(Constitution x 3) - Weapon Size] yards.`
			]
		})
	}
})

export default Projectile
