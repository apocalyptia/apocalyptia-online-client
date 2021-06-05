import Melee from '/src/classes/gear/Melee.js'
import Blunt from '../attributes/Blunt.js'

const BaseballBat = new Melee({
	accuracy: 0,
	attributes: [Blunt],
	damage: 3,
	hands: 2,
	name: `Baseball Bat`,
	penetration: 0,
	range: 2,
	size: 3,
	type: `Melee Weapon`
})

export default BaseballBat
