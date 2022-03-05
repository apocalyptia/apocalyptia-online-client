import Melee from '$classes/gear/Melee.js'
import Blunt from '../attributes/Blunt.js'

const BrassKnuckles = new Melee ({
	accuracy: 0,
	attributes: [ Blunt],
	damage: 1,
	hands: 1,
	name: `Brass Knuckles`,
	penetration: 0,
	range: 1,
	size: 1,
	type: `Melee Weapon`,
})

export default BrassKnuckles
