import Armor from '/src/classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const LeatherGloves = new Armor({
	name: `Leather Gloves`,
	size: 0,
	attributes: [
		ColdResistance,
		FireResistance,
	],
	type: `Armor`,
	absorption: 1,
	location: `Arms (Hands)`,
})

export default LeatherGloves
