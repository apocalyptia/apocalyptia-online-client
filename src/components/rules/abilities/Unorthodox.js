import Ability from './Ability'
import Skills from '../skills/Skills'
import Traits from '../traits/Traits'


const Unorthodox = new Ability({
	id: `9fb108fd-b6ba-4f9a-b225-da7ef4994e80`,
	name: `Unorthodox`,
	desc: [
		`Pick a new parent Trait for a Skill.`,
	],
	max: 1,
	xp: 9,
	opts: (function() {
		const uList = []
		Traits.list.forEach((trait) => {
			Skills.list.forEach((skill) => {
				const tname = trait.name
				const sname = skill.name
				if (skill.parent != trait.name) {
					uList.push({ name: `${tname} - ${sname}` })
				}
			})
		})
		return [...uList]
	})()
})

export default Unorthodox