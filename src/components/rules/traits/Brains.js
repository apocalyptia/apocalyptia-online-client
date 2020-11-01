import Rule from 'classes/Rule.js'
import BrainsSkillsList from 'lists/skills/BrainsSkillsList.js'

const Brains = new Rule({
	id: `ac0d45e3-221c-4cf3-ab70-a19908b86bd7`,
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