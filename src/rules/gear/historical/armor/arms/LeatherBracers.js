import Armor from '/src/classes/gear/Armor.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const LeatherBracers = new Armor({
	name: `Leather Bracers`,
	size: 0,
	attributes: [
		FireResistance,
	],
	type: `Armor`,
	absorption: 1,
	location: `Arms`,
})

export default LeatherBracers
