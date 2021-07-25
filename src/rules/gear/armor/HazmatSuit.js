import Armor from '/src/classes/gear/Armor.js'
import Impermeable from '../../gear/attributes/Impermeable.js'
import Mask from '../../gear/attributes/Mask.js'

const HazmatSuit = new Armor({
	name: `Hazmat Suit`,
	size: 2,
	attributes: [Impermeable, Mask],
	type: `Armor`,
	absorption: 0,
	location: `Head, Arms, Torso, Legs`,
})

export default HazmatSuit
