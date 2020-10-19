import Armor from 'gear/armor/Armor.js'
import Camo from 'gear/attributes/armor/Camo.js'
import ColdResistance from 'gear/attributes/armor/ColdResistance.js'
import FireResistance from 'gear/attributes/armor/FireResistance.js'


const PlateCarrier = new Armor({
	id: `6734c9c6-d9b0-4e3d-b455-6db395645014`,
	name: `Plate Carrier`,
	sz: 4,
	dr: 4,
	loc: `Torso`,
	attr: [
		Camo,
		ColdResistance,
		FireResistance,
	]
})

export default PlateCarrier