import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Acrobatics = new Skill({
	name: `Acrobatics`,
	description: [`Gymnastic prowess.`],
	type: `Skill`,
	parent: `Agility`,
	difficulty: 6,
	specialties: {
		dodge: new Specialty({
			name: `Dodge`,
			type: `Specialty`,
			description: [`Roll vs a Melee or Projectile Attack as an Active Defense to evade that Attack for 1 Action.`],
		}),
		jump: new Specialty({
			name: `Jump`,
			type: `Specialty`,
			description: [`Running Jump distance is [ Agility ] yards.`, `Standing vertical Jump height is [ Agility / 2 ] feet.`],
		}),
	},
})

export default Acrobatics
