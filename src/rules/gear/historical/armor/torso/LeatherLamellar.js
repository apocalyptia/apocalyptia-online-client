import Armor from '/src/classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const LeatherLamellar = new Armor({
	name: `Leather Lamellar`,
	size: 2,
	attributes: [
		ColdResistance,
		FireResistance,
	],
	type: `Armor`,
	absorption: 2,
	location: `Torso`,
})

export default LeatherLamellar
