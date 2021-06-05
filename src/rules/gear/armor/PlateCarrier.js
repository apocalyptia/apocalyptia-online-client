import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const PlateCarrier = new Armor({
	name: `Plate Carrier`,
	size: 3,
	attributes: [Camo, ColdResistance, FireResistance],
	type: `Armor`,
	absorption: 3,
	location: `Torso`
})

export default PlateCarrier
