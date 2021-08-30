import Melee from '/src/classes/gear/Melee.js'
import Blunt from '../attributes/Blunt.js'

const Staff = new Melee ({
	accuracy: 0,
	attributes: [ Blunt],
	damage: 2,
	hands: 2,
	name: `Staff`,
	penetration: 0,
	range: 3,
	size: 3,
	type: `Melee Weapon`,
})

export default Staff
