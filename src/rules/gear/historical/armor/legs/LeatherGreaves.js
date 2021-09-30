import Armor from '/src/classes/gear/Armor.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const LeatherGreaves = new Armor({
	name: `Leather Greaves`,
	size: 2,
	attributes: [
		FireResistance,
	],
	type: `Armor`,
	absorption: 2,
	location: `Legs (Shins)`,
})

export default LeatherGreaves
