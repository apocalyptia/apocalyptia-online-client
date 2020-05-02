import Trait from '../../classes/Trait'
import AgilitySkills from '../skills/lists/AgilitySkills'


const Agility = new Trait({
	name: `Agility`,
	desc: [
		`Agility is a Character’s talent for physical coordination.`,
		`High Agility indicates balance, flexibility, and fine motor skill.`,
		`This Trait is a factor in the Speed and Dodge Properties.`,
		`Agility is the parent Trait for the following Skills: ${AgilitySkills.map(skill => skill.name).join(', ')}.`,
	]
})

export default Agility