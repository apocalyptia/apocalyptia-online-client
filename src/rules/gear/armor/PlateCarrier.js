import Gear from '/src/classes/Gear.js'
import Camo from '/src/rules/gear/attributes/Camo.js'
import ColdResistance from '/src/rules/gear/attributes/ColdResistance.js'
import FireResistance from '/src/rules/gear/attributes/FireResistance.js'

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