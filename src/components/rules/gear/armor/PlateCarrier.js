import Gear from 'gear/Gear.js'
import Camo from 'attributes/Camo.js'
import ColdResistance from 'attributes/ColdResistance.js'
import FireResistance from 'attributes/FireResistance.js'

const PlateCarrier = new Gear({
	id: `6734c9c6-d9b0-4e3d-b455-6db395645014`,
	name: `Plate Carrier`,
	sz: 4,
	attr: [
		Camo,
		ColdResistance,
		FireResistance,
	],
	type: `Armor`
})
PlateCarrier.dr = 4
PlateCarrier.loc = `Torso`

export default PlateCarrier