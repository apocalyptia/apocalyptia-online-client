import Skill from './Skill'
import Specialty from './Specialty'


const Acrobatics = new Skill({
	id: `f19c07a2-1371-48db-b0bc-a88e5bc4e53b`,
	name: `Acrobatics`,
	desc: [
		`Gymnastic prowess.`,
	],
	parent: `Agility`,
	diff: 6,
	specs: {
		dodge: new Specialty({
			id: `a7451f3a-9970-431a-8304-f36ae046e85b`,
			name: `Dodge`,
			desc: [
				`Roll Acrobatics(Dodge) vs [Melee or Ranged].`,
				`As part of a Dodge, you may drop Prone for free if you wish.`,
				`Reflexive Dodge is your Dodge score with no roll.`,
			]
		}),
		jump: new Specialty({
			id: `7a5e0273-8d72-43c3-a826-0a927e2ee0e9`,
			name: `Jump`,
			desc: [
				`Running Jump distance is yards = [Agility].`,
				`Vertical Jump distance is [Agility x 6] inches.`,
			]
		})
	}
})

export default Acrobatics