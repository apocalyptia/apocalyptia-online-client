import Stat from 'rules/Stat.js'
import AgilitySkills from 'lists/skills/AgilitySkills.js'

const Agility = new Stat({
	id: `c84ca95a-9f01-476f-897c-e6ad07231551`,
	name: `Agility`,
	desc: [
		`Agility is a Character’s talent for physical coordination.`,
		`High Agility indicates balance, flexibility, and fine motor skill.`,
		`This Trait is a factor in the Speed and Dodge Properties.`,
		`Agility is the parent Trait for the following Skills: ${AgilitySkills.map(skill => skill.name).join(', ')}.`,
	]
})

export default Agility