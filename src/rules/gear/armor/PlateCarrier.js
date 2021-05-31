import Armor from '/src/classes/gear/Armor.js'
import Camo from '../../gear/attributes/Camo.js'
import ColdResistance from '../../gear/attributes/ColdResistance.js'
import FireResistance from '../../gear/attributes/FireResistance.js'

const PlateCarrier = new Armor({
	name: `Plate Carrier`,
	sz: 3,
	attr: [Camo, ColdResistance, FireResistance],
	type: `Armor`
})
PlateCarrier.dr = 3
PlateCarrier.loc = `Torso`

export default PlateCarrier
