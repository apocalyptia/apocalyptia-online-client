import Armor from '$classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const HikingBoots = new Armor({
	name: `Hiking Boots`,
	size: 2,
	attributes: [ ColdResistance, FireResistance],
	type: `Armor`,
	absorption: 1,
	location: `Legs`,
})

export default HikingBoots
