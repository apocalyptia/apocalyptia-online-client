import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Acrobatics = new Skill({
	name: `Acrobatics`,
	desc: [`Gymnastic prowess.`],
	type: `Skill`,
	parent: `Agility`,
	diff: 6,
	specs: {
		dodge: new Specialty({
			name: `Dodge`,
			type: `Specialty`,
			desc: [`Roll vs a Melee or Projectile Attack to spend one Action attempting to actively evade that Attack.`]
		}),
		jump: new Specialty({
			name: `Jump`,
			type: `Specialty`,
			desc: [`Running Jump distance is [Agility] yards.`, `Standing vertical Jump height is [Agility / 2] feet.`]
		})
	}
})

export default Acrobatics
