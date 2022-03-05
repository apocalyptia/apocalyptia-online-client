import Armor from '$classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const FurCloak = new Armor({
	name: `Fur Cloak`,
	size: 2,
	attributes: [
		ColdResistance,
	],
	type: `Armor`,
	absorption: 1,
	location: `Arms, Torso`,
})

export default FurCloak
