import Armor from '$classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const LeatherBoots = new Armor({
	name: `Leather Boots`,
	size: 2,
	attributes: [
		ColdResistance,
		FireResistance,
	],
	type: `Armor`,
	absorption: 1,
	location: `Legs (Feet)`,
})

export default LeatherBoots
