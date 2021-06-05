import Melee from '/src/classes/gear/Melee.js'
import Blunt from '../attributes/Blunt.js'

const Sledgehammer = new Melee({
	accuracy: -1,
	attributes: [Blunt],
	damage: 4,
	hands: 2,
	name: `Sledgehammer`,
	penetration: 0,
	range: 2,
	size: 5,
	type: `Melee Weapon`
})

export default Sledgehammer
