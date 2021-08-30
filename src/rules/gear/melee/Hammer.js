import Melee from '/src/classes/gear/Melee.js'
import Blunt from '../attributes/Blunt.js'

const Hammer = new Melee ({
	accuracy: 0,
	attributes: [ Blunt],
	damage: 2,
	hands: 1,
	name: `Hammer`,
	penetration: 0,
	range: 1,
	size: 2,
	type: `Melee Weapon`,
})

export default Hammer
