import Trait from './Trait'
import BrainsSkills from '../skills/BrainsSkills'


const Brains = new Trait({
	name: `Brains`,
	desc: [
		`Brains is a Character’s talent for cognitive performance and abstract thought.`,
		`High Brains indicates sharp memory, keen awareness, and studiousness.`,
		`This Trait is a factor in the Experience and Intellect Properties.`,
		`Brains is the parent Trait for the following Skills: ${BrainsSkills.map(skill => skill.name).join(', ')}.`,
	]
})

export default Brains