import Ability from '/src/classes/Ability.js'
import Skills from '../Skills.js'
import Traits from '../Traits.js'

const Unorthodox = new Ability({
	name: `Unorthodox`,
	description: [`Pick a new parent Trait for a Skill.`],
	max: 1,
	experience: 9,
	options: (() => {
		const unorthodoxList = []
		for (const trait in Traits) {
			for (const skill in Skills) {
				const traitName = Traits[trait].name
				const skillName = Skills[skill].name
				if (skill.parent !== traitName) {
					unorthodoxList.push(`${traitName} - ${skillName}`)
				}
			}
		}
		return [...unorthodoxList]
	})()
})

export default Unorthodox
