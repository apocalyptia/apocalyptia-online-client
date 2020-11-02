import Gear from 'classes/Gear.js'
import Camo from 'attributes/Camo.js'
import ColdResistance from 'attributes/ColdResistance.js'
import FireResistance from 'attributes/FireResistance.js'

const PlateCarrier = new Gear({
	name: `Plate Carrier`,
	sz: 4,
	attr: [
		Camo,
		ColdResistance,
		FireResistance,
	],
	type: `Armor`
})
PlateCarrier.dr = 3
PlateCarrier.loc = `Torso`

export default PlateCarrier