import Skill from '../../classes/Skill.js'
import Specialty from '../../classes/Specialty.js'

const Survival = new Skill({
	name: `Survival`,
	desc: [`Primitive practices for living outdoors.`],
	type: `Skill`,
	parent: `Brains`,
	diff: `Biome`,
	specs: {
		forage: new Specialty({
			name: `Forage`,
			type: `Specialty`,
			desc: [`(1hr) Provide 1 Need for 1 person.`]
		}),
		navigate: new Specialty({
			name: `Navigate`,
			type: `Specialty`,
			desc: [`(1min) Plot course`, `Roll vs [Perception] if tracked.`]
		})
	}
})

export default Survival
