import Armor from '$classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'
import Mask from '../../gear/attributes/Mask.js'

const FirefighterSuit = new Armor({
	name: `Firefighter Suit`,
	size: 5,
	attributes: [ ColdResistance, FireResistance, Mask],
	type: `Armor`,
	absorption: 1,
	location: `Head, Arms, Torso, Legs`,
})

export default FirefighterSuit
