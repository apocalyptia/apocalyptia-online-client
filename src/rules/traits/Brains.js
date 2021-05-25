import Rule from '../../classes/Rule.js' 
import Skills from '../Skills.js' 

const brainsSkills = Object.values(Skills).filter(skill => skill.parent === 'Agility')

const Brains = new Rule({
	name: `Brains`,
	desc: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait is a factor in the XP and Intellect Properties.`,
		`Brains is the parent Trait for the following Skills: ${brainsSkills.map(skill => skill.name).join(', ')}.`,
	],
	type: `Trait`
})

export default Brains