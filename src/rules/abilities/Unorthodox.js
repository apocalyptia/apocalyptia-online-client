import Ability from 'classes/Ability.js'
import SkillsList from 'rules/lists/SkillsList.js'
import TraitsList from 'rules/lists/TraitsList.js'

const Unorthodox = new Ability({
	name: `Unorthodox`,
	desc: [
		`Pick a new parent Trait for a Skill.`,
	],
	max: 1,
	xp: 9,
	opts: (function() {
		const uList = []
		TraitsList.list.forEach((trait) => {
			SkillsList.list.forEach((skill) => {
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