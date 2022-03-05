import Melee from '$classes/gear/Melee.js'
import Blunt from '../attributes/Blunt.js'
import Shield from '../attributes/Shield.js'

const RiotShield = new Melee ({
	accuracy: 1,
	attributes: [ Blunt, Shield],
	damage: 0,
	hands: 1,
	name: `Riot Shield`,
	penetration: 0,
	range: 1,
	size: 4,
	type: `Melee Weapon`,
})

export default RiotShield
