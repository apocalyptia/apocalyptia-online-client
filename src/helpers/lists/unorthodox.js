import Traits from '../../components/rules/Traits'
import Skills from '../../components/rules/Skills'

let uList = []
Traits.forEach((trait) => {
	Skills.forEach((skill) => {
		let tname = trait.name
		let sname = skill.name
		if (skill.parent != trait.name) {
			uList.push(
				{
					name: `${tname} - ${sname}`
				}
			)
		}
	})
})

export const UnorthodoxList = [...uList]