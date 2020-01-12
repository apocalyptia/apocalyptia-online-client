import { TraitList } from '../../components/rules/Traits'
import { SkillList } from '../../components/rules/Skills'

let uList = []
TraitList.forEach((trait) => {
	SkillList.forEach((skill) => {
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