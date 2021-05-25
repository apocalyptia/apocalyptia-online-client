import Ability from '../../classes/Ability.js' 
import Skills from '../Skills.js' 
import Traits from '../Traits.js' 

const Unorthodox = new Ability({
	name: `Unorthodox`,
	desc: [
		`Pick a new parent Trait for a Skill.`,
	],
	max: 1,
	experience: 9,
	options: (() => {
		const uList = []
		for (const trait in Traits) {
			for (const skill in Skills) {
				const tname = Traits[trait].name
				const sname = Skills[skill].name
				if (skill.parent !== tname) {
					uList.push(`${tname} - ${sname}`)
				}
			}
		}
		return [...uList]
	})()
})

export default Unorthodox