import Armor from '/src/classes/gear/Armor.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'

const Gambeson = new Armor({
	name: `Gambeson`,
	size: 2,
	attributes: [
		ColdResistance,
	],
	type: `Armor`,
	absorption: 2,
	location: `Arms, Torso`,
})

export default Gambeson
