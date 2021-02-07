import Gear from '$classes/Gear.js'
import Camo from '$rules/gear/attributes/Camo.js'
import ColdResistance from '$rules/gear/attributes/ColdResistance.js'
import FireResistance from '$rules/gear/attributes/FireResistance.js'

const PlateCarrier = new Gear({
	id: ``,
	name: `Plate Carrier`,
	sz: 3,
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