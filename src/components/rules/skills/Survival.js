import Skill from './Skill'
import Specialty from './Specialty'


const Survival = new Skill({
	id: `2d2322ff-8376-4e04-a00b-be803a9b9f02`,
	name: `Survival`,
	desc: [
		`Primitive practices for living outdoors.`,
	],
	parent: `Brains`,
	diff: `Biome`,
	specs: {
		forage: new Specialty({
			id: `cdb225a5-e82f-4be6-855c-bc78ef6f44fc`,
			name: `Forage`,
			desc: [
				`(1hr) Provide 1 Need for 1 person.`,
			]
		}),
		navigate: new Specialty({
			id: `9c1f6a61-bc28-4dde-b89f-0c9a34555f50`,
			name: `Navigate`,
			desc: [
				`(1min) Plot course`,
				`Roll vs [Perception] if tracked.`,
			]
		})
	}
})

export default Survival