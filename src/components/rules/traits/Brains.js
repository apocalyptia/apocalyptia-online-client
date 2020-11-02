import Rule from 'classes/Rule.js'
import BrainsSkillsList from 'lists/skills/BrainsSkillsList.js'

const Brains = new Rule({
	name: `Brains`,
	desc: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait is a factor in the Experience and Intellect Properties.`,
		`Brains is the parent Trait for the following Skills: ${BrainsSkillsList.map(skill => skill.name).join(', ')}.`,
	],
	type: `Trait`
})

export default Brains