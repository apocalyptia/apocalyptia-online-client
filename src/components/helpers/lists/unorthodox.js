import Capitalize from '../Capitalize'
import Traits from '../../rules/Traits'
import Skills from '../../rules/Skills'

let uList = []
Traits.forEach((trait) => {
	Skills.forEach((skill) => {
		let tname = trait.name
		let sname = skill.name
		if (skill.parent != trait.name) {
			uList.push(
				{
					name: `${Capitalize(tname)} - ${Capitalize(sname)}`
				}
			)
		}
	})
})

export const UnorthodoxList = [...uList]