import Skill from './Skill'
import Specialty from './Specialty'


const Survival = new Skill({
	name: `Survival`,
	desc: [
		`Primitive practices for living outdoors.`,
	],
	parent: `Brains`,
	diff: `Biome`,
	specs: {
		forage: new Specialty({
			name: `Forage`,
			desc: [
				`(1hr) Provide 1 Need for 1 person.`,
			]
		}),
		navigate: new Specialty({
			name: `Navigate`,
			desc: [
				`(1min) Plot course`,
				`Roll vs [Perception] if tracked.`,
			]
		})
	}
})

export default Survival