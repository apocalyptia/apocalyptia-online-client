import Melee from '/src/classes/gear/Melee.js'
import Blunt from '../attributes/Blunt.js'

const Club = new Melee({
	accuracy: 0,
	attributes: [Blunt],
	damage: 2,
	hands: 1,
	name: `Club`,
	penetration: 0,
	range: 2,
	size: 2,
	type: `Melee Weapon`,
})

export default Club
